const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("playing")
        .setDescription("Shows information of the current song!"),

    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("Aria didn't found any song playing...")

        let progressBar = queue.createProgressBar({
            queue: false,
            length: 19,
        })

        const currentSong = queue.current

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