const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const http = require("http");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rolls")
    .setDescription("Rolls a Pokemon"),

  async execute(interaction) {
    const botReply = new EmbedBuilder();
    const DISC_ID = interaction.user.id;

    const options = {
      hostname: "localhost",
      port: 9999,
      path: "/api/randomPokemon/" + DISC_ID,
      method: "POST",
    };

    // Create http request to get random pokemon
    const req = http.request(options, (res) => {
      let data = "";
      // get the data from options
      res.on("data", (d) => {
        data += d;
      });

      // Parse the data into the Pokemon name and sprite
      res.on("end", () => {
        let pokemon = JSON.parse(data);
        botReply
          .setTitle(`POKEMON GATCHA`)
          .setDescription(`You rolled a(n) ${pokemon.name}`)
          .setImage(`${pokemon.sprite.front_default}`);
        // Return the API information for a bot response
        return interaction.reply({ embeds: [botReply] });
      });
    });

    req.on("error", (error) => {
      console.error(error);
    });

    req.end();
  },
};
