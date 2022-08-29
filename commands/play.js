const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType } = require("discord-player");




module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play a YouTube video!'),
	async execute(interaction) {
		await interaction.reply('zzzzzzzzzz....');
	},
};