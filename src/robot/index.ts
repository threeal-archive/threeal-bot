import * as discord from "discord.js";
import * as chalk from "chalk";
import { initEchoMessage } from "./echo-message";

export async function initRobot(token: string): Promise<discord.Client> {
  const client = new discord.Client();

  client.once("ready", () => {
    initEchoMessage(client);
  });

  console.debug(`Login using token ${chalk.yellow(token)}...`);
  await client.login(token);

  console.log(`Logged in as ${chalk.green(client.user.username)}!`);

  return client;
}
