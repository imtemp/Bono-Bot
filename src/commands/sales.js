const { SlashCommandBuilder } = require("discord.js");
const discord = require("discord.js");

module.exports.run = (client, msg, args) => {
  // Make an API call to steam store for the games on sale
  let url = "https://store.steampowered.com/api/featuredcategories/?l=english";
  let response = "Error";
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      response = "";
    });

  data = new SlashCommandBuilder()
    .setName("sales")
    .setDescription("Shows all games on sale on Steam");
};
