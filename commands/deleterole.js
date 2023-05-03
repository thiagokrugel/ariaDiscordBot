const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deleterole')
		.setDescription('TESTE'),
	run: async ({ interaction }) => {
        if (interaction.member.id != '261644285491937282') return interaction.editReply("You're not allowed to run this command!")
        interaction.guild.roles.delete("1103439373569097771");
        await interaction.deleteReply();
    }
}