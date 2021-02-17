const dotenv = require('dotenv');

dotenv.config();

const Discord = require('discord.js');

const client = new Discord.Client();

client.once('ready', () => {
  console.log('Bot ready!');
});

console.log(`Login using token ${process.env.TOKEN}`);
client.login(process.env.TOKEN);
