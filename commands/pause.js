const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses the current song!"),

    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("Aria didn't found any song playing...")

        else return await interaction.editReply("Aria paused current song! Use /resume to continue playing!"), queue.setPaused(true)
        
    },
}   