const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('parabensxumt')
		.setDescription('ANIVERXUMT'),
	run: async ({ interaction }) => {
		await interaction.editReply('PARABENS XUMT https://www.youtube.com/watch?v=rSH2_uii0vo');
	},
};