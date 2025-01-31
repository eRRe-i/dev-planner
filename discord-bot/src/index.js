import { Client, IntentsBitField } from "discord.js";
import { config } from "dotenv";

config()

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
}) 

client.on('ready', c => {
    console.log(`${c.user.tag} is online`)
})

client.on('messageCreate', (message) => {
    if(message.content === 'ping'){
        message.reply('pong')
    }
})

client.login(process.env.TOKEN)
