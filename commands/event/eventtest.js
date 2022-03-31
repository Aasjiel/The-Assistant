const {
  Client,
  CommandInteraction,
  MessageEmbed,
  GuildScheduledEvent,
} = require("discord.js");
const { validateDate } = require("../../helpers/validate.js");
const data = require(`${process.cwd()}/properties.json`);

module.exports = {
  name: "eventtest",
  description: "event",
  type: "CHAT_INPUT",

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

  run: async (client, interaction, args) => {
    const guild = client.guilds.cache.get("840658907466039397");

    let event = {
      name: "eventtest",
      scheduledStartTime: "2022-06-01T00:00:00+00:00",
      scheduledEndTime: "2022-06-01T02:00:00+00:00",
      privacyLevel: "GUILD_ONLY",
      entityType: "EXTERNAL",
      description: "lorem ipsum",
      entityMetadata: { location: "earth" },
    };

    guild.scheduledEvents.create(event);
  },
};
