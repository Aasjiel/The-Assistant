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

    
    // let event = new GuildScheduledEvent(
    //   client.user.id,
    //   interaction.channel
    // )
    //   .setName("name")
    //   .setDescription("description")
    //   .setLocation("location")
    //   .setScheduledStartTime("2022-03-30T07:24:29+00:00")
    //   .setScheduledEndTime("2022-03-30T07:24:29+00:00")
    //   .setStatus("SCHEDULED");
    // await interaction.reply({
    //   content: event.toString(),
    // });
  },
};
