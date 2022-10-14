const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
require("dotenv").config();

// Create the discord bot client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const clientId = "1030281161420853369";

// GET slash commands
let commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

// Add slash commands into array
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

// Load slash commands
async () => {
  try {
    // Log process
    console.log(`Loading ${commands.length} slash commands`);

    const data = await rest.put(Routes.applicationGuildCommands(clientId), {
      body: commands,
    });

    console.log(`${data.length} slash commands loaded successfully`);
  } catch (err) {
    console.log(error);
  }
};

// Receive interaction
client.on("interactionCreate", async (interaction) => {
  // filter non-chat inputs
  if (!interaction.isChatInputCommand()) {
    return;
  }
  console.log(interaction);

  if (interaction.commandName === "sales") {
    await interaction.reply("WIP");
  }
});

// Load bot
client.once("ready", () => {
  console.log("Bot is ready...");
});

client.login(process.env.BOT_TOKEN);
