const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { useQueue } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Shows current video queue!")
        .addNumberOption((option) => option.setName("page").setDescription("Page number")),

    run: async ({client, interaction}) => {
        const queue = useQueue(interaction.guildId);

        if (!queue?.isPlaying()) return await interaction.editReply("Aria didn't found any song playing...")

        const tracks = queue.tracks.toArray();

        const pagesTotal = Math.ceil(tracks.length/10) || 1
        const page = (interaction.options.getNumber("page") || 1) - 1

        if (page > pagesTotal)
            return await interaction.editReply(`Aria only found ${pagesTotal} pages in the queue!`) 

        const queueString = tracks.slice(page * 10, page * 10 + 10).map((track, i) => {
            return `\n**${page * 10 + i + 1}. \`[${track.duration}]\` ${track.title} - <@${track.requestedBy}>**`
        })

        const currentSong = queue.currentTrack

        const embeds = new EmbedBuilder()
            .setColor('#c7fabe')
            .setTitle('Current queue!')
            .setDescription(`**Now playing:** \n` + 
            (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} - <@${currentSong.requestedBy}>` : "None") + 
            `\n\n**Queue:**\n${queueString}`
            )
            .setFooter({
                text: `Page: ${page + 1} of ${pagesTotal} | Aria appreciates your support!`
            })
            .setThumbnail(currentSong.thumbnail)

        await interaction.editReply({
            embeds: [embeds]                   
        })
    }
}