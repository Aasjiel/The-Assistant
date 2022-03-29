const client = require("../index")

client.on("messageCreate", async message => {
    console.log(message.author.displayName + "Has send a message with the value\n" + message.content);
})