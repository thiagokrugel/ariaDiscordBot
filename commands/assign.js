const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('assign')
		.setDescription('TESTE'),
	run: async ({ interaction }) => {
        if (interaction.member.id != '261644285491937282') return interaction.editReply("You're not allowed to run this command!")
        const user = await interaction.guild.members.fetch('369253646602469376')
        user.roles.add("1103442811812053124");
        await interaction.deleteReply();
    }
}