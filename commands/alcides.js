const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('alcides')
		.setDescription('soninho'),
	async execute(interaction) {
		await interaction.reply('zzzzzzzzzz....');
	},
};