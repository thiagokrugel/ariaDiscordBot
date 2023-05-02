const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nickchange')
		.setDescription('TESTE')
        .addStringOption((option) => option.setName("user").setDescription("id").setRequired(true))
        .addStringOption((option) => option.setName("name").setDescription("new name").setRequired(true)),
	run: async ({ interaction }) => {
        if (interaction.member.id != '261644285491937282') return interaction.editReply("smartphoned clown")
        let userID = interaction.options.getString("user")
        let newNickname = interaction.options.getString("name")
		const user = await interaction.guild.members.fetch(userID)
        user.setNickname(newNickname)
        await interaction.deleteReply();
	},
};