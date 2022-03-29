const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    name: "help",
    description: "Get help for the diffrent commands and about the bot.",
    type: 'CHAT_INPUT',

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        let helpEmbed = new MessageEmbed()
            .setTitle(` Help for ${client.user.tag} -- Help`)
            .setDescription(`DESCRIPTION`)
            .setColor("#00fff2")
            .setTimestamp()
            .setFooter("By Aasjiel | github.com/aasjiel")
            
            client.slashCommands.map(value => {
                helpEmbed.addField(value.name, value.description, true)
            })
        
        await interaction.reply({ embeds: [helpEmbed] })    }
}