const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flamescore")
    .setDescription("Calculates the flamescore of an item in your screenshot"),
  async execute(interaction) {},
};
