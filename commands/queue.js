const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Shows current video queue!")
        .addStringOption((option) => option.setName("page").setDescription("Page number")),

        run: async ({client, interaction}) => {
            const queue = client.player.getQueue(interaction.guildId)
            if(!queue || !queue.playing){
                return await interaction.reply("Aria didn't found anything! Is the queue empty?")
            }

            const pagesTotal = Math.ceil(queue.tracks.length/10) || 1
            const page = (interaction.options.getNumber("page") || 1) - 1

            if (page > pagesTotal)
                return await interaction.reply(`Aria only found ${pagesTotal} in the queue!`) 

            const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
                return `**${page * 10 + i + 1}. \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`
            })

            const currentSong = queue.current

            await interaction.editReply({
                embeds:
                    new EmbedBuilder()
                        .setColor('#c7fabe')
                        .setTitle('Current queue!')
                        .setDescription(`Now playing: \n` + 
                        (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${song.requestedBy.id}>` : "None") + 
                        `\n\n**Queue**\n${queueString}`
                        )
                        .setFooter({
                            text: `Page: ${page + 1} of ${pagesTotal}`
                        })
                        .setThumbnail(currentSong.thumbnail)
            })
        }
}