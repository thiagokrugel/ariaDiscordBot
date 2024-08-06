const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { useMainPlayer } = require('discord-player');


module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Plays a video from YouTube!")
		.addStringOption((option) => option.setName("search").setDescription("Enter the desired query!").setRequired(true)
    ),

	run: async ({ client, interaction }) => {
        const player = useMainPlayer();
        

		if (!interaction.member.voice.channel) return interaction.editReply("Join a voice channel to use this!")

		//const queue = await client.player.createQueue(interaction.guild)
		//if (!queue.connection) await queue.connect(interaction.member.voice.channel)

		let embed = new EmbedBuilder()

        let url = interaction.options.getString("search")
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id)

        try {
            if (!url.includes("list")){
                const { track } = await player.play(interaction.member.voice.channel, url, {
                    nodeOptions: { 
                        metadata: interaction               
                    }
                })

                embed
                    .setColor('#c7fabe')
                    .setDescription(`Aria added **[${track.title}](${track.url})** to the queue!\n\n Requested by: <@${interactionUser.id}>`)
                    .setThumbnail(track.thumbnail)
                    .setFooter({ text: `Duration: ${track.duration} | Aria appreciates your support!`})
            }

            else {
                const { track } = await player.play(interaction.member.voice.channel, url, {
                    nodeOptions: { 
                        metadata: interaction               
                    }
                })
                embed
                    .setColor('#c7fabe')
                    .setDescription(`Aria added ${track.playlist.tracks.length} tracks from **[${track.playlist.title}](${track.playlist.url})** to the queue!\n\n Requested by: <@${interactionUser.id}>`)
                    .setThumbnail(track.playlist.thumbnail)
                    .setFooter({ text: `Duration: ${track.playlist.durationFormatted} | Aria appreciates your support!`})
            }
        }

        catch (e){
            console.log(e)
            return interaction.editReply("Aria didn't found anything...")                
        }
    
        // song.play()
        // if (!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: [embed]
        })
	},
}