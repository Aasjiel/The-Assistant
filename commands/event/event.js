const {
  Client,
  CommandInteraction,
  MessageEmbed,
  GuildScheduledEvent,
} = require("discord.js");
const { validateDate } = require("../../helpers/validate.js");
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
        },
        {
          name: "channel",
          type: "STRING",
          description: "Specify the channel the event takes place in.",
          required: true,
        },
        {
          name: "start",
          type: "STRING",
          description:
            "Date and time the event starts in the format yyyy-mm-ddThh:mm:ss+hh:mm",
          required: true,
        },
        {
          name: "end",
          type: "STRING",
          description: "Date and time the event ends",
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
    if (args[0] === "add") {
      const name = args[1];
      const description = args[2];
      const type = args[3];
      const location = args[4];
      const start = args[5];
      const end = args[6];
      if (!(await validateDate(start)) && !(await validateDate(end))) {
        return interaction.reply({
          content: "Invalid date format, please use DD/MM/YYYY",
        });
      }
      let channel_id = interaction.channel;

      const newEvent = {
        id: 1,
        name: name,
        description: description,
        type: type,
        location: location,
        start: start,
        end: end,
        channel_id: client.channels.fetch('840658907466039401'),
        id: 1,
      };

      let event = new GuildScheduledEvent(1, client.user.id, newEvent)
        .setName("name")
        .setDescription("description")
        .setLocation("location")
        .setScheduledStartTime("2022-03-30T07:24:29+00:00")
        .setScheduledEndTime("2022-03-30T07:24:29+00:00")
        .setStatus("SCHEDULED");

      await interaction.reply({
        content: event.toString(),
      });
    }
  },
};
