# Discord Bot

Este é um bot simples para Discord, desenvolvido com `discord.js` e `dotenv` para gerenciamento de variáveis de ambiente.

## Requisitos

- Node.js (versão recomendada: 16 ou superior)
- Um bot registrado no Discord Developer Portal
- Um arquivo `.env` contendo a chave `TOKEN`

## Instalação

Clone este repositório e instale as dependências:

```sh
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto e adicione:

```
TOKEN=seu_token_aqui
```

## Uso

Para iniciar o bot, execute:

```sh
node src/index.js
```

O bot responde ao comando `ping` com `pong`.

## Estrutura do Projeto

```
/
├── src/
│   ├── index.js  # Arquivo principal do bot
├── .env          # Arquivo de variáveis de ambiente (não incluso no repositório)
├── package.json  # Configurações do projeto
└── README.md     # Documentação
```

## Dependências

- `discord.js` (^14.17.3) - Biblioteca para interação com a API do Discord
- `dotenv` (^16.4.7) - Carrega variáveis de ambiente a partir de um arquivo `.env`

## Licença

Este projeto está licenciado sob a licença ISC.



