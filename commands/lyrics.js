const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { useQueue } = require("discord-player")
const { useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lyrics")
        .setDescription("Shows lyrics for current song!"),

    run: async ({client, interaction}) => {
        const queue = useQueue(interaction.guildId);

        const player = useMainPlayer();

        let embed = new EmbedBuilder()

        if (!queue?.isPlaying()) return await interaction.editReply("Aria didn't found any song playing...")
        
        const currentSong = queue.currentTrack

        const lyrics = await player.lyrics.search({
            q: currentSong.title
        })

        if (!lyrics.length) return await interaction.editReply("Aria didn't found lyrics for this song...")

        embed
            .setColor('#c7fabe')
            .setTitle(currentSong.title)
            .setDescription(lyrics)
            .setThumbnail(currentSong.thumbnail)
            .setFooter({ text: `Aria appreciates your support!`})

        await interaction.editReply({
            embeds: [embed]
        })
    }
}