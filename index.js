const { Client, Intents, Collection } = require("discord.js")
const dotenv = require("dotenv")

dotenv.config()

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
	]
});
module.exports = client;

client.slashCommands = new Collection();
["events", "commands"].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});


client.login(process.env.TOKEN)