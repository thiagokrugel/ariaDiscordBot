const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('message')
		.setDescription('TESTE')
        .addStringOption((option) => option.setName("type").setDescription("user or channel").setRequired(true))
        .addStringOption((option) => option.setName("user").setDescription("id").setRequired(true))
        .addStringOption((option) => option.setName("message").setDescription("message content").setRequired(true)),
	run: async ({ interaction }) => {
        //if (interaction.member.id != '261644285491937282') return interaction.editReply("You're not allowed to run this command!")
        let type = interaction.options.getString("type")
        if (type == "user"){
            let userID = interaction.options.getString("user")
            let message = interaction.options.getString("message")
            const user = await interaction.guild.members.fetch(userID)
            user.send(message)
            await interaction.deleteReply();
        }
        else if (type == "channel"){
            let channelID = interaction.options.getString("user")
            let message = interaction.options.getString("message")
            const user = await interaction.guild.channels.fetch(channelID);
            user.send(message)
            await interaction.deleteReply();
        }
        else{
            await interaction.editReply("invalid type") 
        }
	},
};