const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const Tesseract = require("tesseract.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flamescore")
    .setDescription("Calculates the flamescore of an item in your screenshot")
    .addStringOption((option) =>
      option
        .setName("image")
        .setDescription("Link to an image of equipment")
        .setRequired(true)
    ),
  async execute(interaction) {
    const image = interaction.options.getString("image");
    console.log(image);
    Tesseract.recognize(image, "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      console.log(text);
    });
    await interaction.reply("a");
  },
};
