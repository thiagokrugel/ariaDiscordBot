const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Shuffles the current queue!"),

    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("Aria didn't found any song playing...")

        else return await interaction.editReply("Aria shuffled the current queue!"), queue.shuffle()
        
    },
}   