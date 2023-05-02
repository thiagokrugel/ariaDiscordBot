const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('TESTE')
        .addStringOption((option) => option.setName("user").setDescription("id").setRequired(true))
        .addStringOption((option) => option.setName("reason").setDescription("reason to kick").setRequired(true)),
	run: async ({ interaction }) => {
        if (interaction.member.id != '261644285491937282') return interaction.editReply("You're not allowed to run this command!")
        let userID = interaction.options.getString("user")
        let reason = interaction.options.getString("reason")
        const user = await interaction.guild.members.fetch(userID)
        await user.kick({ reason: `${reason}`});
        await interaction.deleteReply();       
    }
}