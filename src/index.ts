import { Client, Message } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

const client: Client = new Client();

client.once('ready', () => {
  console.log(`Bot ${client.user.username} is ready!`);
});

client.on('message', (message: Message) => {
  console.log(`Received ${message.cleanContent} from ${message.author.username}`);

  if (message.author.id != client.user.id) {
    message.channel.send(message.content);
  }
});

console.log(`Login using token ${process.env.TOKEN}`);
client.login(process.env.TOKEN)
  .catch((err: Error) => {
    console.error(`Login failed! ${err.message}`);
  });
