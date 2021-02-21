import * as Discord from "discord.js";
import * as Chalk from "chalk";
import * as Nlu from "../nlu";

export async function initNluTest(
  client: Discord.Client,
  nlu: Nlu.Instance,
  isDebugServer: (string) => boolean
): Promise<void> {
  console.debug(`Initializing ${Chalk.yellow("NLU Test")} behavior...`);

  client.on("message", (message: Discord.Message) => {
    if (isDebugServer(message.guild.name)) {
      return;
    }

    if (message.author.id === client.user.id) {
      return;
    }

    const mentioned = message.mentions.users.some((user: Discord.User) => {
      return user.id === client.user.id;
    });

    if (mentioned) {
      console.debug(
        `Received ${Chalk.yellow(message.cleanContent)}` +
          ` from ${Chalk.yellow(message.author.username)}!`
      );

      console.debug(`Talking to the NLU server...`);
      nlu
        .talk({
          userId: message.author.id,
          text: message.cleanContent,
        })
        .then(async (nluMessages: Nlu.Message[]) => {
          let mentionOnce = false;
          for (const nluMessage of nluMessages) {
            console.debug(
              `Replied with ${Chalk.yellow(
                nluMessage.text || nluMessage.file
              )}!`
            );

            const options: Discord.MessageOptions = {};

            if (!mentionOnce) {
              mentionOnce = true;
              options.reply = message.author;
            }

            if (nluMessage.file !== undefined) {
              options.files = [nluMessage.file];
            }

            await message.channel.send(nluMessage.text || "", options);
          }
        })
        .catch((err: Error) => {
          console.warn(
            `Unable to talk to the NLU Server! ${Chalk.yellow(err.message)}`
          );
        });
    }
  });

  console.log(`${Chalk.green("NLU Test")} behavior initialized!`);
}
