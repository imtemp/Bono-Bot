const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fame")
    .setDescription("Fames an user in the server")
    .addSubcommand((option) =>
      option
        .setName("user")
        .setDescription("User you want to fame")
        .setRequire(true)
    ),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
