const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uml')
		.setDescription('soninho'),
	async execute(interaction) {
		await interaction.reply('😴😴😴');
	},
};