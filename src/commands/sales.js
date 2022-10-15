const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  // Make an API call to steam store for the games on sale
  data: new SlashCommandBuilder()
    .setName("sales")
    .setDescription("Shows top 10 games on sale from Steam"),
  async execute(interaction) {
    let url = "https://store.steampowered.com/api/featuredcategories";
    let games = "";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let gameData = data.specials.items;
        for (let i = 0; i < data.specials.items.length; i++) {
          games +=
            "**" +
            gameData[i].name +
            "** ~~$" +
            gameData[i].original_price / 100 +
            "~~ -> $" +
            gameData[i].final_price / 100 +
            "\n";
        }
        return interaction.reply(games);
      });
  },
};
