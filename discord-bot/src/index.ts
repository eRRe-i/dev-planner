import { Client, IntentsBitField } from 'discord.js'
import { config } from 'dotenv'
import { generateImage } from './github-graph'
import { GithubAPIHandler } from './githubAPIhandler'

config()

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
})

client.on('ready', (c) => {
  console.log(`${c.user.tag} is online`)
})

client.on('messageCreate', (message) => {
  if (message.content === 'ping') {
    message.reply('pong')
  }
})

client.on('messageCreate', async (message) => {
  console.log(JSON.stringify(message, null, 2))
  if (message.content.startsWith('!contributions')) {
    const username = message.content.split(' ')[1]
    try {
      const weeks = await GithubAPIHandler.getContributions(username)
      const imageBuffer = generateImage(weeks) // Gera o gráfico para 2025

      // Envia a imagem como um arquivo anexo
      await message.channel.send({
        files: [
          {
            attachment: imageBuffer,
            name: 'contributions_2025.png', // Nome do arquivo
          },
        ],
      })
    } catch (error: any) {
      console.error(error)
      message.channel.send(`Erro ao obter contribuições: ${error.message}`)
    }
  }
})

client.login(process.env.TOKEN)

// 2. permitir que o usuário possa utilizer !contributions !github -me para retornar seu usuário.
// 3. Com o usuário registrado , o usuário pode apenas digitar !contributions ou !contrib para mostrar seu proprio gráfico de contribuições, não precisando mais passar o nome de usuário GH
// 4. Um !contrib -guide explicando com dicas para realizar contribuições no GH. Apenas coloque um loremipsum de um parágrafo, irei preencher depois
// 5. um !contrib -help explicando todos os comandos existentes para contrib
// 6. um !commands para uma lista e breve explicação de todos os comandos.

// Primeiro, vamos começar com o primeiro passo e depois fazemos os demais.
