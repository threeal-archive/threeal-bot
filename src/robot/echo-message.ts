import * as discord from "discord.js";
import * as chalk from "chalk";

export function initEchoMessage(client: discord.Client): void {
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
}
