import * as Discord from "discord.js";
import { initEchoMessage } from "./echo-message";
import { initWatchStatus } from "./watch-status";

export async function initBehaviors(
  client: Discord.Client,
  debugServer?: string
): Promise<void> {
  await initEchoMessage(client, debugServer);
  await initWatchStatus(client);
}
