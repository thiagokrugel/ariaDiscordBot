const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType } = require("discord-player");




module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play a YouTube video!')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('video')
				.setDescription('Plays a video from an URL!')
				.addStringOption((option) => option.setName('url').setDescription("video's url").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('playlist')
				.setDescription('Plays a playlist from an URL!')
				.addStringOption((option) => option.setName('url').setDescription("playlist's url").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('search')
				.setDescription('Plays a video from keywords inputted!')
				.addStringOption((option) => option.setName('searchargs').setDescription("keywords to search").setRequired(true))
		),
	async execute({client, interaction}) {
		if (!interaction.user.voice.channel)
			return interaction.reply("You need to be in a voice channel to use this command!")

		const queue = await client.player.createQueue(interaction.guild)
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)

		let embed = new EmbedBuilder()

		if (interaction.options.getSubcommand() === "video"){
			let url = interaction.options.getString("url")
			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_VIDEO
			})
			if (result.tracks.length === 0)
				return interaction.reply("Video not found!")
			
			const video = result.tracks[0]
			await queue.addTrack(video)
			embed
				.setDescription(`**[${video.title}](${video.url})** added to the queue!`)
				.setThumbnail(video.thumbnail)
				.setFooter(`Video duration: **${video.duration}**`)
		}
		else if (interaction.options.getSubcommand() === "playlist"){
			let url = interaction.options.getString("url")
			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_PLAYLIST
			})
			if (result.tracks.length === 0)
				return interaction.reply("Playlist not found!")
			
			const playlist = result.playlist
			await queue.addTrack(result.tracks)
			embed
				.setDescription(`**${result.tracks.length} videos from [${playlist.title}](${playlist.url})** added to the queue!`)
				.setThumbnail(playlist.thumbnail)

		}
		else if (interaction.options.getSubcommand() === "search"){
			let url = interaction.options.getString("searchterms")
			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_VIDEO
			})
			if (result.tracks.length === 0)
				return interaction.reply("Search has returned 0 results!")
			
			const video = result.tracks[0]
			await queue.addTrack(video)
			embed
				.setDescription(`**[${video.title}](${video.url})** added to the queue!`)
				.setThumbnail(video.thumbnail)
				.setFooter(`Video duration: **${video.duration}**`)
		}
		else {
			await interaction.reply('Command not found')
		}
		if (!queue.playing) await queue.play()
		await interaction.reply({
			embeds: [embed]
		})
	},
};