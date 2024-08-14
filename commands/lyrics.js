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

        if (!lyrics.length){console.log(lyrics); return await interaction.editReply("Aria didn't found lyrics for this song...")}


        const cleanLyrics = lyrics[0].plainLyrics.substring(0, 40000);

        console.log(lyrics[0])

        embed
            .setColor('#c7fabe')
            .setTitle(`${lyrics[0].trackName} - ${lyrics[0].artistName}`)
            .setThumbnail(currentSong.thumbnail)
            .setDescription(cleanLyrics.length === 40000 ? `${cleanLyrics}...` : cleanLyrics)
            .setFooter({ text: `Aria appreciates your support!`})

        await interaction.editReply({
            embeds: [embed]
        })
    }
}