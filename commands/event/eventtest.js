const { Client, CommandInteraction } = require("discord.js");
const {
  validateDate,
  validateVocieChannel,
} = require("../../helpers/validate.js");
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

     const channel = "Village square";
     const channelVal = guild.channels.cache.find(e => e.name === channel);
    //  console.log(channelVal);
     const channelID = channelVal.id;
    //  console.log("----------------------------------------------------------------------------------");
    //  console.log(channelID);
    //  console.log("----------------------------------------------------------------------------------");

    if (channelVal) {
      //"840886666159325184"
      let event = {
        name: "eventtest",
        scheduledStartTime: "2022-06-01T00:00:00+00:00",
        scheduledEndTime: "2022-06-01T02:00:00+00:00",
        privacyLevel: "GUILD_ONLY",
        entityType: "VOICE",
        description: "lorem ipsum",
        channel: channelID,
        entityMetadata: { location: "earth" },
      };

      guild.scheduledEvents.create(event);
      return;
    } else {
      return interaction.reply({
        content: "Invalid guild channel",
      });
    }
  },
};
