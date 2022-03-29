const { readdirSync } = require("fs")
// const { client } = require('../index.js')

// Require all events decalred in ../events
module.exports = (client) => {
  readdirSync("./events/").forEach((file) => {
    const events = readdirSync("./events/").filter((file) =>
      file.endsWith(".js")
    );

    for (let file of events) {
      let pull = require(`../events/${file}`);

      if (pull.name) {
        client.events.set(pull.name, pull);
      } else {
        continue;
      }
    }
  });
}
