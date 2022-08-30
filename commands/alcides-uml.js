const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('alcides-uml')
		.setDescription('soninho'),
	async execute(interaction) {
		await interaction.reply('https://www.youtube.com/watch?v=x3cZwk9VAzA');
	},
};