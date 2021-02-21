import * as Discord from "discord.js";
import { initEchoMessage } from "./echo-message";
import { initWatchStatus } from "./watch-status";

export function initBehaviors(
  client: Discord.Client,
  debugServer?: string
): void {
  client.once("ready", () => {
    initEchoMessage(client, debugServer);
    initWatchStatus(client);
  });
}
