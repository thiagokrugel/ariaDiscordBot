const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('alcides')
		.setDescription('soninho'),
	run: async ({ interaction }) => {
		await interaction.editReply('zzzzzzzzzz....');
	},
};