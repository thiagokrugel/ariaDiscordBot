const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pokemon")
        .setDescription("Shows info about a Pokémon!")
        .addStringOption((option) => option.setName("name").setDescription("enter the desired pokemon name!").setRequired(true)),


    run: async ({ interaction }) => {

        let pokeSearch = interaction.options.getString("name")

        const pokeName = pokeSearch.toLowerCase()

        let url = 'https://pokeapi.co/api/v2/pokemon/' + pokeName

        console.log(url)

        let settings = { method: "Get" };

        const json = await fetch(url, settings)
            .then(res => res.json())
            .then((json) => {
                console.log(json)
                return json
        });

        const id = json.id

        const embeds = new EmbedBuilder()
            .setColor('#c7fabe')
            .setTitle(json.name)
            .setDescription(`${json.flavor_text} | Type: placeholder`)
            .setFooter({
                text: `National ID: ${id} | Aria appreciates your support!`
            })
            .setThumbnail(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`)

        await interaction.editReply({
            embeds: [embeds]                   
        })
    },
}