const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const http = require("http");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pokedex")
    .setDescription("Shows the Pokedex of the user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription(
          "Displays the user's pokedex, if no one is mentioned then it will display own Pokedex"
        )
        .setRequired(false)
    ),
  async execute(interaction) {
    const botReply = new EmbedBuilder()
      .setTitle("Pokedex")
      .setDescription("You own:");
    let pokemon = "";
    let user = interaction.user.id;
    if (interaction.options.getUser("user")) {
      user = interaction.options.getUser("user").id;
    }
    const options = {
      hostname: "localhost",
      port: 9999,
      path: "/api/pokedex/" + user,
      method: "GET",
    };

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (d) => {
        data += d;
      });

      res.on("end", () => {
        let pokedex = JSON.parse(data);
        console.log(pokedex);
        if (pokedex.length != 0) {
          for (let i = 0; i < pokedex.length; i++) {
            pokemon = pokedex[i].name;
            pkmnPosition = pokedex[i].position;
            botReply.addFields({ name: "#" + pkmnPosition, value: pokemon });
          }
        } else {
          botReply.addFields({
            name: "EMPTY",
            value: "You have no Pokemons yet",
          });
        }
        return interaction.reply({ embeds: [botReply] });
      });
    });
    req.end();
  },
};
