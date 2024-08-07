const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { useQueue } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("nowplaying")
        .setDescription("Shows information of the current song!"),

    run: async ({ client, interaction }) => {
        const queue = useQueue(interaction.guildId);

        if (!queue?.isPlaying()) return await interaction.editReply("Aria didn't found any song playing...")

        let progressBar = queue.createProgressBar({
            queue: false,
            length: 19,
        })

        const currentSong = queue.currentTrack

        const embeds = new EmbedBuilder()
            .setColor('#c7fabe')
            .setTitle('Now playing!')
            .setDescription(`[${currentSong.title}](${currentSong.url})\n\n` + progressBar)
            .setFooter({
                text: `Aria appreciates your support!`
            })
            .setThumbnail(currentSong.thumbnail)

        await interaction.editReply({
            embeds: [embeds]                 
        })
        
    },
}   