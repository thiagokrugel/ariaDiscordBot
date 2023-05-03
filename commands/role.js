const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('TESTE'),
	run: async ({ interaction }) => {
        if (interaction.member.id != '261644285491937282') return interaction.editReply("You're not allowed to run this command!")
        interaction.guild.roles.create({            
            name: 'namorado do thigas',
            color: '#00ffea',
            position: 5,    
            hoist: true,      
        })
        await interaction.deleteReply();    
    }
}