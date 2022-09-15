const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current song!"),

    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("Aria didn't found any song playing...")

        else return await interaction.editReply("Aria is skipping current song..."), queue.skip()
        
    },
}   