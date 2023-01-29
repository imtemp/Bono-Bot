const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
const http = require("http");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rolls")
    .setDescription("Rolls a Pokemon"),
  async execute(interaction) {
    /*
    fetch("localhost:9999/api/randomPokemon")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.name);
      });
      */
    let botReply = new EmbedBuilder();

    const options = {
      hostname: "localhost",
      port: 9999,
      path: "/api/randomPokemon",
      method: "GET",
    };

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (d) => {
        data += d;
      });

      res.on("end", () => {
        let pokemon = JSON.parse(data);
        botReply
          .setTitle(`POKEMON GATCHA`)
          .setDescription(
            `You rolled a(n) ${
              pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
            }`
          )
          .setImage(`${pokemon.sprite.front_default}`);
        return interaction.reply({ embeds: [botReply] });
      });
    });

    req.on("error", (error) => {
      console.error(error);
    });

    req.end();
  },
};
