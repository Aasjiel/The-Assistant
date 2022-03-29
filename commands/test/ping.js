const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const { writeFile } = require("fs")
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    name: "ping",
    description: "Replies wit pong and a value",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "value",
            type: "STRING",
            description: "Specify an extra value.",
            required: false
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.reply({ content: "Pong, with the value " + interaction.options.data[0].value })    }
}