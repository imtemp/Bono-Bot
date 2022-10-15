const { SlashCommandBuilder } = require("discord.js");
const discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("8ball").setDescription("8ball"),
  async execute(interaction) {
    let url = "https://8ball.delegator.com/magic/JSON/";
    let answer = "";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        answer = data.magic.answer;
      });
    await interaction.reply(answer);
  },
};
