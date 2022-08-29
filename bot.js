const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { clientId, token } = require("./config.json");
const { Player, QueryType } = require("discord-player");
const { REST } = require('@discordjs/rest');
const { ActivityType } = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

client.player = new Player(client, { /* music player */
    ytdlOptions: {
        quality: "highestAudio",
        highWaterMark: 1 << 25
    }
});

const commandsPath = path.join(__dirname, 'commands');

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

const prefix = ">"

const rest = new REST({ version: '10' }).setToken(token);

client.once("ready", () => {
	console.log("Rodando!");
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'deu ruim', ephemeral: true });
	}
});

client.login(token);