const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stops playing current song and clear the queue!"),

    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("Aria shutting down!"), queue.destroy()

        else return await interaction.editReply("Aria shutting down!"), queue.destroy()
        
    },
}   