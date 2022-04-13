const {
  Client,
  CommandInteraction,
  MessageEmbed,
  Message,
} = require("discord.js");
const {
  validateDate,
  validateTime,
  validateSameNameEvents,
} = require("../../helpers/validate.js");
const data = require(`${process.cwd()}/properties.json`);
const Converter = require("timestamp-conv");
const { sleep } = require("../../helpers/sleep.js");

module.exports = {
  name: "event",
  description: "Create, find, edit or delete events.",
  type: "CHAT_INPUT",
  options: [
    {
      name: "add",
      type: "SUB_COMMAND",
      description: "add an event",
      options: [
        {
          name: "name",
          type: "STRING",
          description: "The name of the event",
          required: true,
        },
        {
          name: "description",
          type: "STRING",
          description: "Specify what this event is for",
          required: true,
        },
        {
          name: "type",
          type: "STRING",
          description:
            "Specify whether this event is External, in a voice chat or something else",
          required: true,
          choices: [
            {
              name: "EXTERNAL",
              value: "EXTERNAL",
            },
            {
              name: "VOICE",
              value: "VOICE",
            },
          ],
        },
        {
          name: "date",
          type: "STRING",
          description: "Date the event starts in the format yyyy-mm-dd",
          required: true,
        },
        {
          name: "start",
          type: "STRING",
          description: "Time the event starts in the format hh:mm:ss",
          required: true,
        },
        {
          name: "end",
          type: "STRING",
          description: "Time the event ends in the format hh:mm:ss",
          required: true,
        },
        {
          name: "location",
          type: "STRING",
          description: "Specify the location the event takes place in.",
          required: true,
        },
        {
          name: "voicechannel",
          type: "STRING",
          description:
            "Specify the voiceChannel name the event takes place in.",
          required: true,
        },
      ],
    },
    {
      name: "find",
      type: "SUB_COMMAND",
      description: "find an event",
      options: [
        {
          name: "name",
          type: "STRING",
          description: "The name of the event",
          required: true,
        },
        {
          name: "id",
          type: "STRING",
          description: "id of the event",
          required: false,
        },
      ],
    },
    {
      name: "edit",
      type: "SUB_COMMAND",
      description: "find an event",
      options: [
        {
          name: "name",
          type: "STRING",
          description: "The name of the event",
          required: true,
        },
        {
          name: "id",
          type: "STRING",
          description:
            "Provide the id of the event. If you don't know the id use /event find <name of the Event>",
          required: true,
        },
        {
          name: "attribute",
          type: "STRING",
          description: "The attribute you want to edit",
          required: true,
          choices: [
            {
              name: "name",
              value: "name",
            },
            {
              name: "description",
              value: "description",
            },
            {
              name: "start",
              value: "start",
            },
            {
              name: "end",
              value: "end",
            },
            {
              name: "location",
              value: "location",
            },
          ],
        },
        {
          name: "value",
          type: "STRING",
          description: "The new value of event attribute",
          required: true,
        },
      ],
    },
    {
      name: "delete",
      type: "SUB_COMMAND",
      description: "find an event",
      options: [
        {
          name: "name",
          type: "STRING",
          description: "The name of the event you want to delete",
          required: true,
        },
        {
          name: "id",
          type: "STRING",
          description:
            "The id of the event you want to delete. If you don't know the id use /event find <name of the Event>",
          required: true,
        },
      ],
    },
  ],

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

  run: async (client, interaction, args) => {
    const guild = client.guilds.cache.get("840658907466039397");

    //----------------------------------------------------------------//
    //                        add SUBCOMMAND                          //
    //----------------------------------------------------------------//

    if (args[0] === "add") {
      const name = args[1];
      const description = args[2];
      const type = args[3];
      const privacyLevel = "GUILD_ONLY";
      const date = args[4];
      const start = args[5];
      const end = args[6];
      const location = args[7];
      const voicechannel = args[8];
      if (
        !(await validateDate(date)) &&
        !(await validateTime(end)) &&
        !(await validateTime(start))
      ) {
        return interaction.reply({
          content: "Invalid date format, please use DD/MM/YYYY",
        });
      }
      const channelVal = guild.channels.cache.find(
        (e) => e.name === voicechannel
      );
      const channelID = channelVal.id;

      const eventStart = date + "T" + start;
      const eventEnd = date + "T" + end;

      const newEvent = {
        name: name,
        scheduledStartTime: eventStart,
        scheduledEndTime: eventEnd,
        privacyLevel: privacyLevel,
        entityType: type,
        description: description,
        entityMetadata: { location: location },
        channel: channelID,
      };

      guild.scheduledEvents.create(newEvent).then(async (event) => {
        await interaction.reply({
          content:
            "https://discord.com/events/840658907466039397/" +
            guild.scheduledEvents.cache.find((e) => e.name === name).id,
        });
      });
    }

    //----------------------------------------------------------------//
    //                        find SUBCOMMAND                         //
    //----------------------------------------------------------------//

    if (args[0] === "find") {
      const name = args[1];
      const id = args[2];
      const event = guild.scheduledEvents.cache.find((e) => e.name === name);
      const eventById = guild.scheduledEvents.cache.find((e) => e.id === id);
      // console.log(event);
      console.log(eventById);
      const eventArray = guild.scheduledEvents.cache.filter(
        (e) => e.name === name
      );
      function sameNameEvents() {
        const sameNameEvents = guild.scheduledEvents.cache.filter(
          (e) => e.name === name
        );
        return sameNameEvents.size > 1;
      }

      if (eventById || (event && !sameNameEvents())) {
        switch (eventById || (event && !sameNameEvents())) {
          case eventById:
            const startDate = new Converter.timestamp(
              eventById.scheduledStartTimestamp
            ).formatSeconds;
            const endDate =
              eventById.scheduledEndTimestamp !== null
                ? new Converter.timestamp(eventById.scheduledEndTimestamp)
                    .formatSeconds
                : "no set enddate";
            const embed = new MessageEmbed()
              .setTitle(event.name)
              .setDescription(
                eventById.description !== null
                  ? eventById.description
                  : "no description given"
              )
              .setColor("FUCHSIA")
              .addField("Type", eventById.entityType, true)
              .addField("ID", eventById.id, true)
              .addField(
                "Location",
                eventById.entityMetadata !== null
                  ? eventById.entityMetadata.location
                  : "no location given",
                true
              )
              .addField("Start", startDate, true)
              .addField("End", endDate, true)
              .addField(
                "Channel",
                event.channelId !== null
                  ? guild.channels.cache.get(event.channelId).name
                  : "no channel given",
                true
              )
              .setFooter(
                `By ${client.user.username} | github.com/Aasjiel/The-Assistant`
              );
            await interaction.reply({ embeds: [embed] });
            break;
          case event && !sameNameEvents():
            const startDateByName = new Converter.timestamp(
              event.scheduledStartTimestamp
            ).formatSeconds;
            const endDateByName =
              event.scheduledEndTimestamp !== null
                ? new Converter.timestamp(event.scheduledEndTimestamp)
                    .formatSeconds
                : "no set enddate";
            const embedByName = new MessageEmbed()
              .setTitle(event.name)
              .setDescription(
                event.description !== null
                  ? event.description
                  : "no description given"
              )
              .setColor("FUCHSIA")
              .addField("Type", event.entityType, true)
              .addField("ID", event.id, true)
              .addField(
                "Location",
                event.entityMetadata !== null
                  ? event.entityMetadata.location
                  : "no location given",
                true
              )
              .addField("Start", startDateByName, true)
              .addField("End", endDateByName, true)
              .addField(
                "Channel",
                event.channelId !== null
                  ? guild.channels.cache.get(event.channelId).name
                  : "no channel given",
                true
              )
              .setFooter(
                `By ${client.user.username} | github.com/Aasjiel/The-Assistant`
              );
            await interaction.reply({ embeds: [embedByName] });
            break;
        }
      } else if (!event) {
        await interaction.reply({
          content: "No event found with the name: " + name,
        });
      } else {
        eventArray.forEach((event) => {
          const startDate = new Converter.timestamp(
            event.scheduledStartTimestamp
          ).formatSeconds;
          const endDate =
            event.scheduledEndTimestamp !== null
              ? new Converter.timestamp(event.scheduledEndTimestamp)
                  .formatSeconds
              : "no set enddate";
          const embed = new MessageEmbed()
            .setTitle(event.name)
            .setDescription(
              event.description !== null
                ? event.description
                : "no description given"
            )
            .setColor("FUCHSIA")
            .addField("Type", event.entityType, true)
            .addField("ID", event.id, true)
            .addField(
              "Location",
              event.entityMetadata !== null
                ? event.entityMetadata.location
                : "no location given",
              true
            )
            .addField("Start", startDate, true)
            .addField("End", endDate, true)
            .addField(
              "Channel",
              event.channelId !== null
                ? guild.channels.cache.get(event.channelId).name
                : "no channel given",
              true
            )
            .setFooter(
              `By ${client.user.username} | github.com/Aasjiel/The-Assistant`
            );
          interaction.channel.send({ embeds: [embed] });
        });
        await interaction.reply({
          content:
            "There are multiple events with the name: " +
            name +
            " please specify the id of the event",
        });
      }
    }

    //----------------------------------------------------------------//
    //                        edit SUBCOMMAND                         //
    //----------------------------------------------------------------//

    if (args[0] === "edit") {
      const name = args[1];
      const id = args[2];
      const param = args[4];
      const event = guild.scheduledEvents.cache.find(
        (e) => e.name === name && e.id === id
      );

      if (event) {
        switch (args[3]) {
          case "description":
            guild.scheduledEvents
              .edit(event.id, {
                description: param,
              })
              .then(async (event) => {
                await interaction.reply({
                  content:
                    "https://discord.com/events/840658907466039397/" + id,
                });
              });
            break;
          case "start":
            guild.scheduledEvents
              .edit(event.id, {
                scheduledStartTime: param,
              })
              .then(async (event) => {
                await interaction.reply({
                  content:
                    "https://discord.com/events/840658907466039397/" + id,
                });
              });
            break;

          case "end":
            guild.scheduledEvents
              .edit(event.id, {
                scheduledEndTime: param,
              })
              .then(async (event) => {
                await interaction.reply({
                  content:
                    "https://discord.com/events/840658907466039397/" + id,
                });
              });
            break;

          case "location":
            guild.scheduledEvents
              .edit(event.id, {
                entityMetadata: { location: param },
              })
              .then(async (event) => {
                await interaction.reply({
                  content:
                    "https://discord.com/events/840658907466039397/" + id,
                });
              });
            break;

          case "name":
            guild.scheduledEvents
              .edit(event.id, {
                name: param,
              })
              .then(async (event) => {
                await interaction.reply({
                  content:
                    "https://discord.com/events/840658907466039397/" + id,
                });
              });
            break;
        }
      } else {
        await interaction.reply({
          content: "No event found with the name & id: " + name + " // " + id,
        });
      }
    }

    //----------------------------------------------------------------//
    //                        delete SUBCOMMAND                       //
    //----------------------------------------------------------------//

    if (args[0] === "delete") {
      const name = args[1];
      const id = args[2];
      const event = guild.scheduledEvents.cache.find(
        (e) => e.name === name && e.id === id
      );

      if (event) {
        event.delete().then(async (event) => {
          await interaction.reply({
            content: "The Event: " + name + " has been deleted",
          });
        });
      } else {
        await interaction.reply({
          content: "No event found with the name & id: " + name + " // " + id,
        });
      }
    }
  },
};
