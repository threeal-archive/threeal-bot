import * as Discord from "discord.js";
import * as Chalk from "chalk";
import * as Status from "../store/status";

async function updateUserStatus(userId: string, status: string) {
  const now = new Date();
  await Status.updateUserStatus(userId, {
    status: status,
    startTime: now.getTime(),
  });
}

async function initUsersLatestStatuses(guild: Discord.Guild): Promise<void> {
  const usersLatestStatuses = await Status.getAllUserLatestStatus();

  // Update latest statuses from discord cache
  guild.members.cache.forEach((member: Discord.GuildMember) => {
    const user = member.user;
    if (user.id in usersLatestStatuses) {
      const status = usersLatestStatuses[user.id];
      if (status.status != user.presence.status) {
        console.debug(
          `Updating new user status! ${Chalk.yellow(user.username)}` +
            ` is ${Chalk.yellow(user.presence.status)}`
        );
        updateUserStatus(user.id, user.presence.status);
      }
    } else {
      console.debug(
        `Found new user status! ${Chalk.yellow(user.username)}` +
          ` is ${Chalk.yellow(user.presence.status)}`
      );
      updateUserStatus(user.id, user.presence.status);
    }
  });
}

export async function initWatchStatus(
  client: Discord.Client,
  guild: Discord.Guild
): Promise<void> {
  console.debug(`Initializing ${Chalk.yellow("Watch Status")} behavior...`);

  await initUsersLatestStatuses(guild);

  client.on("presenceUpdate", async (_, presence: Discord.Presence) => {
    const userLatestStatus = await Status.getUserLatestStatus(presence.userID);
    if (
      userLatestStatus === undefined ||
      userLatestStatus.status != presence.status
    ) {
      console.debug(
        `Updating new user status! ${Chalk.yellow(presence.user.username)}` +
          ` is ${Chalk.yellow(presence.status)}`
      );
      updateUserStatus(presence.userID, presence.status);
    }
  });

  console.log(
    `${Chalk.green("Watch Status")} behavior initialized` +
      ` on ${Chalk.green(guild.name)}!`
  );
}
