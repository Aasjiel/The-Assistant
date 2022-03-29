const { Client, CommandInteraction } = require("discord.js")
const { writeFile } = require("fs")
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    name: "command1",
    description: "Just a test, you can set a discription",
    userPermissions: ["ADMINISTRATOR"],
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        await interaction.reply({ content: `Command1 has been triggered.`, ephemeral: true })
    },
};