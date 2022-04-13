const { Client, CommandInteraction } = require("discord.js");
const {
  validateDate,
  validateVocieChannel,
} = require("../../helpers/validate.js");
const data = require(`${process.cwd()}/properties.json`);

module.exports = {
  name: "eventtest",
  description: "Test command with hardcoded data.",
  type: "CHAT_INPUT",

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

  run: async (client, interaction, args) => {
    const guild = client.guilds.cache.get("840658907466039397");

    const channel = "Village square";
    const channelVal = guild.channels.cache.find((e) => e.name === channel);
    const channelID = channelVal.id;
    const rnd = Math.floor(Math.random() * 100);
    const allEvents = guild.scheduledEvents.cache.filter(e => e.privacyLevel === "GUILD_ONLY");
    console.log(allEvents);
    console.log(allEvents.size);

    if (channelVal) {
      let event = {
        name: "eventtest" + rnd,
        scheduledStartTime: "2022-06-01T00:00:00+00:00",
        scheduledEndTime: "2022-06-01T02:00:00+00:00",
        privacyLevel: "GUILD_ONLY",
        entityType: "VOICE",
        description: "lorem ipsum",
        channel: channelID,
        entityMetadata: { location: "earth" },
      };

      // guild.scheduledEvents.create(event);
      return interaction.reply({
        content: "Event scheduled \n" + "List of all current events: \n",
      });
    } else {
      return interaction.reply({
        content: "Invalid guild channel",
      });
    }
  },
};
