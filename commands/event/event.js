const {
  Client,
  CommandInteraction,
  MessageEmbed,
  GuildScheduledEvent,
} = require("discord.js");
const { validateDate, validateTime } = require("../../helpers/validate.js");
const data = require(`${process.cwd()}/properties.json`);

module.exports = {
  name: "event",
  description: "event",
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
          description: "Specify whether this event is External, voice or stage",
          required: true,
          choices: [
            {
              name: "EXTERNAL",
              value: "EXTERNAL",
            },
            {
              name: "NONE",
              value: "EXTERNAL",
            },
          ],
        },
        {
          name: "privacylevel",
          type: "STRING",
          description: "Define if the event is publioc or guild only",
          required: true,
          choices: [
            {
              name: "PUBLIC",
              value: "PUBLIC",
            },
            {
              name: "GUILD_ONLY",
              value: "GUILD_ONLY",
            },
          ],
        },
        {
          name: "location",
          type: "STRING",
          description: "Specify the location the event takes place in.",
          required: true,
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
    if (args[0] === "add") {
      const name = args[1];
      const description = args[2];
      const type = args[3];
      const privacyLevel = args[4];
      const location = args[5];
      const date = args[6];
      const start = args[7];
      const end = args[8];
      if (
        !(await validateDate(date)) &&
        !(await validateTime(end)) &&
        !(await validateTime(start))
      ) {
        return interaction.reply({
          content: "Invalid date format, please use DD/MM/YYYY",
        });
      }

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
      };

      guild.scheduledEvents.create(newEvent);

      await interaction.reply({
        content:
          "you created an event with the folowing details: \n name: " +
          name +
          "\n description: " +
          description +
          "\n type: " +
          type +
          "\n privacyLevel: " +
          privacyLevel +
          "\n location: " +
          location +
          "\n date: " +
          date +
          "\n start: " +
          start +
          "\n end: " +
          end,
      });
    }
  },
};
