const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("8ball")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Ask a question")
        .setRequired(true)
    ),
  async execute(interaction) {
    let url = "https://8ball.delegator.com/magic/JSON/";
    const answer = interaction.options.getString("question");
    fetch(url + answer)
      .then((res) => res.json())
      .then((data) => {
        let reply = data.magic.answer;
        return interaction.reply(reply);
      });
  },
};
