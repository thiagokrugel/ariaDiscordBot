const { Client, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const prefix = ">"

client.once("ready", () => {
	console.log("Rodando!");
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

    const {commandName} = interaction;

    if (commandName === prefix + 'teste') {
		await interaction.reply('summit shaper');
	}
});

client.login(token);