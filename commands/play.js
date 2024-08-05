const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")
const { useMainPlayer } = require('discord-player');
const { YouTubeExtractor } = require('@discord-player/extractor');


module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Plays a video from YouTube!")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("song")
				.setDescription("Plays a video from an URL!")
				.addStringOption((option) => option.setName("url").setDescription("video's url").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("playlist")
				.setDescription("Loads a playlist from an URL!")
				.addStringOption((option) => option.setName("url").setDescription("playlist's url").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("search")
				.setDescription("Plays a video from keywords inputted!")
				.addStringOption((option) =>
					option.setName("searchterms").setDescription("keywords").setRequired(true)
				)
		),
	run: async ({ client, interaction }) => {
        const player = useMainPlayer();
        player.extractors.register(YouTubeExtractor);
        await player.extractors.loadDefault()

		if (!interaction.member.voice.channel) return interaction.editReply("Join a voice channel to use this!")

		//const queue = await client.player.createQueue(interaction.guild)
		//if (!queue.connection) await queue.connect(interaction.member.voice.channel)

		let embed = new EmbedBuilder()

		if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            if (result.tracks.length === 0)
                return interaction.editReply("Aria didn't found anything...")
            
            const song = result.tracks[0]
            //await queue.addTrack(song)
            embed
                .setColor('#c7fabe')
                .setDescription(`Aria added **[${song.title}](${song.url})** to the queue!\n\n Requested by: <@${song.requestedBy.id}>`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration} | Aria appreciates your support!`})

		} else if (interaction.options.getSubcommand() === "playlist") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })

            if (result.tracks.length === 0)
                return interaction.editReply("Aria didn't found anything...")
            
            const playlist = result.playlist
            //await queue.addTracks(result.tracks)
            embed
                .setColor('#c7fabe')
                .setDescription(`Aria added **${result.tracks.length} songs from [${playlist.title}](${playlist.url})** to the queue!\n\n Requested by: <@${result.tracks[0].requestedBy.id}>`)
                .setFooter({ text: `Aria appreciates your support!`})
                
		} else if (interaction.options.getSubcommand() === "search") {
            let url = interaction.options.getString("searchterms")
            const interactionUser = await interaction.guild.members.fetch(interaction.user.id)

            try {
            const { track } = await player.play(interaction.member.voice.channel, url, {
                nodeOptions: { 
                    metadata: interaction               
                }
            });
            //song.play()
            // await queue.addTrack(song)
            
            embed
                .setColor('#c7fabe')
                .setDescription(`Aria added **[${track.title}](${track.url})** to the queue!\n\n Requested by: <@${interactionUser.id}>`)
                .setThumbnail(track.thumbnail)
                .setFooter({ text: `Duration: ${track.duration} | Aria appreciates your support!`})
            }
            catch (e){
                console.log(e)
                return interaction.editReply("Aria didn't found anything...")                
            }
		}
        // song.play()
        // if (!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: [embed]
        })
	},
}