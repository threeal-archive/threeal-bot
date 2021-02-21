import * as Dotenv from "dotenv";
import * as Discord from "discord.js";
import * as Http from "http";
import * as Mongoose from "mongoose";
import * as Chalk from "chalk";
import * as Nlu from "./nlu";
import { initBehaviors } from "./behaviors";

Dotenv.config();

function errorUndefinedVar(variable: string): string {
  console.error(`Please provide ${Chalk.red(variable)} variable!`);
  process.exit(1);
}

const botToken: string =
  process.env.BOT_TOKEN || errorUndefinedVar("BOT_TOKEN");
const dbUri: string = process.env.DB_URI || errorUndefinedVar("DB_URI");
const nluUrl: string = process.env.NLU_URL || errorUndefinedVar("NLU_URI");
const port: string | undefined = process.env.PORT;
const debugServer: string | undefined = process.env.DEBUG_SERVER;

function isDebugServer(serverName: string) {
  if (debugServer === undefined || serverName !== debugServer) {
    return false;
  }
}

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

    const nlu = new Nlu.Instance(nluUrl);

    console.debug(`Connecting to the NLU server on ${Chalk.yellow(nluUrl)}...`);
    const message = await nlu.init().catch((err: Error) => {
      console.error(
        `Failed to connect to the NLU server! ${Chalk.red(err.message)}`
      );
      process.exit(1);
    });

    console.log(
      `Connected to the NLU server with response ${Chalk.green(message)}`
    );

    await initBehaviors(client, nlu, isDebugServer);
  })
  .login(botToken)
  .catch((err: Error) => {
    console.error(`Failed to login the bot! ${Chalk.red(err.message)}`);
    process.exit(1);
  });
