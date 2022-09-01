const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    name: "info",
    description: "General information about this bot.",
    type: 'CHAT_INPUT',

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        let helpEmbed = new MessageEmbed()
            .setTitle(`${client.user.username}`)
            .setDescription(`Lorem ipsum dolor sit amet`)
            .setColor("#00fff2")
            .setTimestamp()
            .setURL("https://github.com/aasjiel/the-assistant")
            .setThumbnail("https://media.discordapp.net/attachments/968845406047989853/1014156187584966716/TheAssLogo.png")
            .setFooter("By Aasjiel | github.com/aasjiel")
            .addField("The idea","The idea of this bot is to enable servers to easily create/edit/delete server events")
            .addField("Contributors","Fynnyx#4024 [https://github.com/fynnyx]")
            .addField("Version","v0.0.1")
        
        await interaction.reply({ embeds: [helpEmbed] })    }
}