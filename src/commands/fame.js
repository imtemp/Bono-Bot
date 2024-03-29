const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fame")
    .setDescription("Fame an user in the server")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to fame")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    console.log(user);
    return interaction.reply("a");
  },
};
