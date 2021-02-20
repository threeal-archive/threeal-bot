import * as discord from "discord.js";
import * as dotenv from "dotenv";
import * as chalk from "chalk";
import { connectDatabase } from "./database";

dotenv.config();

const client: discord.Client = new discord.Client();

client.once("ready", () => {
  console.log(`Bot ${chalk.green(client.user.username)} is ready!`);

  connectDatabase(process.env.DB_URI);
});

client.on("message", (message: discord.Message) => {
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

console.log(`Login using token ${chalk.green(process.env.BOT_TOKEN)}`);
client.login(process.env.BOT_TOKEN).catch((err: Error) => {
  console.error(`Login failed! ${chalk.red(err.message)}`);
});
