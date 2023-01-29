const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("art")
    .setDescription("Generate AI Art")
    .addStringOption((option) =>
      option.setName("tags").setDescription("Tags for the AI").setRequired(true)
    ),
  async execute(interaction) {
    let url = "https://8ball.delegator.com/magic/JSON/";
    const artTag = interaction.options.getString("tags");
    fetch(url + artTag)
      .then((res) => res.json())
      .then((data) => {
        let reply = data.magic.answer;
        return interaction.reply(reply);
      });
  },
};
