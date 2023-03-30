const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const request = require('request');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pokemon")
        .setDescription("Shows info about a Pokémon!")
        .addStringOption((option) => option.setName("name").setDescription("enter the desired pokemon name!").setRequired(true)),


    run: async ({ interaction }) => {

        let pokeSearch = interaction.options.getString("name")

        const pokeName = pokeSearch.toLowerCase()

        const url = 'https://pokeapi.co/api/v2/pokemon/' + pokeName

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var json = JSON.parse(body);
                console.log(json);
                return json
            }
        })

        const id = json.id

        const embeds = new EmbedBuilder()
            .setColor('#c7fabe')
            .setTitle(json.name)
            .setDescription(`${json.flavor_text} | Type: ${json.types.type.name}`)
            .setFooter({
                text: `National ID: ${id} | Aria appreciates your support!`
            })
            .setThumbnail(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`)

        await interaction.editReply({
            embeds: [embeds]                   
        })
    },
}