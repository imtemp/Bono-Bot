const path = require("node:path");
const { REST } = require("@discordjs/rest");
const fs = require("node:fs");
const { Routes } = require("discord.js");
require("dotenv").config();

const clientId = "1030281161420853369";
const guildId = "773617023586271233";

// Create array and filter files ending in .js
let commands = [];
const filePath = path.join(__dirname, "src", "commands");
const commandFiles = fs
  .readdirSync(filePath)
  .filter((file) => file.endsWith(".js"));

// Add slash commands into array
for (const file of commandFiles) {
  const cmdPath = path.join(filePath, file);
  const command = require(cmdPath);
  commands.push(command.data.toJSON());
}

// Register the commands
const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
