import { Client, IntentsBitField } from "discord.js";
import { config } from "dotenv";
import { generateImage, getContributions } from "./github-graph.js";

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

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!contributions')) {
      const username = message.content.split(' ')[1];
      try {
        const weeks = await getContributions(username);
        const imageBuffer = generateImage(weeks, 2025); // Gera o gráfico para 2025
  
        // Envia a imagem como um arquivo anexo
        await message.channel.send({
          files: [{
            attachment: imageBuffer,
            name: 'contributions_2025.png' // Nome do arquivo
          }]
        });
      } catch (error) {
        console.error(error);
        message.channel.send(`Erro ao obter contribuições: ${error.message}`);
      }
    }
  });

client.login(process.env.TOKEN)

