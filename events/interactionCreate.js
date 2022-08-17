const client = require("../index.js");
const {startEvent} = require("../helpers/event.js");

client.on("interactionCreate", async (interaction) => {
  // DONT CHANGE THIS CODE
  // It calls the right SlashCommand run function.
  if (interaction.isCommand()) {
    // await interaction.deferReply({ ephemeral: false }).catch(() => { });

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return interaction.followUp({ content: "An error has occured " });

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );

    cmd.run(client, interaction, args);
  }
  // --> Here you can go on.
  if (interaction.isButton()) {
    switch (interaction.customId) {
      case "event-start":
        // const message = interaction.message.content;
        // const eventid = message.split("/")[5];
        // startEvent(eventid, interaction.guild.id);
        // console.log(eventid);

        interaction.reply({ content: "Event started" });
        break;
      default:
    }
  }
});
