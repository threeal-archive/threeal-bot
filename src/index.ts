import * as Discord from "discord.js";
import * as Http from "http";
import * as Mongoose from "mongoose";
import * as Dotenv from "dotenv";
import * as Chalk from "chalk";
import { initBehaviors } from "./behaviors";

Dotenv.config();

["BOT_TOKEN", "DB_URI"].forEach((it) => {
  if (!process.env[it]) {
    console.error(`Please provide ${Chalk.red(it)} variable!`);
    process.exit(1);
  }
});

const botToken = process.env.BOT_TOKEN;
const dbUri = process.env.DB_URI;
const port = process.env.PORT;
const debugServer = process.env.DEBUG_SERVER;

const client = new Discord.Client();

console.debug(`Logging in the bot using token ${Chalk.yellow(botToken)}...`);
client
  .once("ready", async () => {
    console.log(`Bot logged in as ${Chalk.green(client.user.username)}!`);

    const app = await client.fetchApplication().catch((err: Error) => {
      console.warn(`Unable to get the app info! ${Chalk.yellow(err.message)}`);
    });

    if (app instanceof Discord.Application) {
      const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${app.id}&scope=bot`;
      console.log(`Invite the bot to your server on ${Chalk.green(inviteUrl)}`);

      if (port) {
        console.debug(
          `Creating a HTTP redirect server on port ${Chalk.yellow(port)}...`
        );
        Http.createServer((_, res: Http.ServerResponse) => {
          res.writeHead(301, { Location: inviteUrl });
          res.end();
        }).listen(port);
      }
    } else {
      console.warn("Invalid app info!");
    }

    console.debug(`Connecting to the database on ${Chalk.yellow(dbUri)}...`);
    const mongoose = await Mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).catch((err: Error) => {
      console.error(
        `Failed to connect to the database! ${Chalk.red(err.message)}`
      );
      process.exit(1);
    });

    for (const connection of mongoose.connections) {
      console.log(`Connected to the database ${Chalk.green(connection.name)}!`);
    }

    await initBehaviors(client, debugServer);
  })
  .login(botToken)
  .catch((err: Error) => {
    console.error(`Failed to login the bot! ${Chalk.red(err.message)}`);
    process.exit(1);
  });
