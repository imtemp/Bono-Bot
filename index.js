// Requires
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("node:path");
require("dotenv").config();

// Create the discord bot client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// GET slash commands
client.commands = new Collection();
const filePath = path.join(__dirname, "src", "commands");
const commandFiles = fs
  .readdirSync(filePath)
  .filter((file) => file.endsWith(".js"));

// Set the files into commands collection
for (const file of commandFiles) {
  const cmdPath = path.join(filePath, file);
  const command = require(cmdPath);
  client.commands.set(command.data.name, command);
}

// Load bot
client.once("ready", () => {
  console.log("Bot is ready...");
});

// Load slash commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.log(err);
    await interaction.reply({ content: "There was an error", ephemeral: true });
  }
});

client.login(process.env.BOT_TOKEN);
