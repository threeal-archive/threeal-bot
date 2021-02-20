import * as Discord from "discord.js";
import * as Chalk from "chalk";

export function initEchoMessage(
  client: Discord.Client,
  debugServer?: string
): void {
  console.debug(`Initializing ${Chalk.yellow("Echo Message")} behavior...`);

  client.on("message", (message: Discord.Message) => {
    if (typeof debugServer === "string" && message.guild.name !== debugServer) {
      return;
    }

    if (message.author.id !== client.user.id) {
      console.debug(
        `Received ${Chalk.yellow(message.cleanContent)}` +
          ` from ${Chalk.yellow(message.author.username)}!`
      );

      message.channel.send(message.content, {
        reply: message.author,
      });
    }
  });

  console.log(`${Chalk.green("Echo Message")} behavior initialized`);
}
