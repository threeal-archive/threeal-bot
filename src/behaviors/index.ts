import * as Discord from "discord.js";
import { initEchoMessage } from "./echo-message";
import { initWatchStatus } from "./watch-status";

export function initBehaviors(client: Discord.Client): void {
  client.once("ready", () => {
    initEchoMessage(client);

    client.guilds.cache.forEach((guild) => {
      initWatchStatus(client, guild);
    });
  });
}
