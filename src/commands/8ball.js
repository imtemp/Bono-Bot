const { SlashCommandBuilder } = require("discord.js");
const discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("8ball").setDescription("8ball"),
  async execute(interaction) {
    await interaction.reply("WIP");
  },
};
