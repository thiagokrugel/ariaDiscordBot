const { SlashCommandBuilder } = require("@discordjs/builders")
const { useQueue } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current song!"),

    run: async ({ client, interaction }) => {
        const queue = useQueue(interaction.guildId);

        if (!queue?.isPlaying()) return await interaction.editReply("Aria didn't found any song playing...")

        else return await interaction.editReply("Aria is skipping current song..."), queue.node.skip()        
    },
}   