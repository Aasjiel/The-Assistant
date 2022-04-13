const { MessageEmbed } = require("discord.js");
const { client } = require("../index.js")

exports.getEmbedFromJSON = async (filePath) => {
    const embedData = require(filePath)
    const embed = new MessageEmbed()
        .setTitle(embedData.title)
        .setDescription(embedData.description)
        .setColor(embedData.color)
        embedData.fields.map((field) => {
            embed.addFields({ name: field.name, value: field.value, inline: field.inline})
        })
        
    return embed;
}