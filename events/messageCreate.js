const client = require("../index")

client.on("messageCreate", async message => {
    console.log(message.author.username + " sent a message: " + message.content);
})