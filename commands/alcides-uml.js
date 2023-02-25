const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('alcides-uml')
		.setDescription('soninho'),
	run: async ({ interaction }) => {
		await interaction.editReply('https://www.youtube.com/watch?v=x3cZwk9VAzA');
	},
};