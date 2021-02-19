import { Client, Message } from "discord.js";
import * as dotenv from "dotenv";
import * as chalk from "chalk";

dotenv.config();

const client: Client = new Client();

client.once("ready", () => {
  console.log(`Bot ${chalk.green(client.user.username)} is ready!`);
});

client.on("message", (message: Message) => {
  if (message.author.id !== client.user.id) {
    console.log(
      `Received ${chalk.green(message.cleanContent)}` +
        ` from ${chalk.green(message.author.username)}`
    );

    message.channel.send(message.content, {
      reply: message.author,
    });
  }
});

console.log(`Login using token ${chalk.green(process.env.TOKEN)}`);
client.login(process.env.TOKEN).catch((err: Error) => {
  console.error(`Login failed! ${chalk.red(err.message)}`);
});
