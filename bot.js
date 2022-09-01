const Discord = require("discord.js")
const { Client, Collection, GatewayIntentBits } = require("discord.js")
const { clientId, token } = require("./config.json")
const { Player } = require("discord-player")
const { REST } = require('@discordjs/rest')
const { ActivityType } = require('discord.js')
const { Routes } = require("discord-api-types/v9")

const fs = require('node:fs');
const path = require('node:path');
const LOAD_SLASH = process.argv[2] == "load"

const CLIENT_ID = "1004715283619008582"
const GUILD_ID = "836925573968298024"

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
})

client.slashcommands = new Discord.Collection()
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

let commands = []

const slashFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))
for (const file of slashFiles){
    const slashcmd = require(`./commands/${file}`)
    client.slashcommands.set(slashcmd.data.name, slashcmd)
    if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
}

if (LOAD_SLASH) {
    const rest = new REST({ version: "9" }).setToken(token)
    console.log("Deploying slash commands")
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands})
    .then(() => {
        console.log("Successfully loaded")
        process.exit(0)
    })
    .catch((err) => {
        if (err){
            console.log(err)
            process.exit(1)
        }
    })
}
else {
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}`)
    })
    client.on("interactionCreate", (interaction) => {
        try {
            async function handleCommand() {
                if (!interaction.isCommand()) return

                const slashcmd = client.slashcommands.get(interaction.commandName)
                if (!slashcmd) await interaction.deferReply("Something went wrong :(");

                await interaction.deferReply()
                await slashcmd.run({ client, interaction })
            }
            handleCommand()
        }
        catch {
            console.log(err)
            interaction.reply("Something went wrong :(");
            process.exit(1)
        }
    })
    client.login(token)
}