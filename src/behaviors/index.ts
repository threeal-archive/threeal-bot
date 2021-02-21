import * as Discord from "discord.js";
import * as Nlu from "../nlu";
import { initNluTest } from "./nlu-test";
import { initWatchStatus } from "./watch-status";

export async function initBehaviors(
  client: Discord.Client,
  nlu: Nlu.Instance,
  isDebugServer: (string) => boolean
): Promise<void> {
  await initNluTest(client, nlu, isDebugServer);
  await initWatchStatus(client);
}
