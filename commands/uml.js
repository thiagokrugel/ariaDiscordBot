const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uml')
		.setDescription('soninho'),
	run: async ({ interaction }) => {
		await interaction.editReply('😴😴😴');
	},
};