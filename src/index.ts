import * as Discord from "discord.js";
import * as Mongoose from "mongoose";
import * as Dotenv from "dotenv";
import * as Chalk from "chalk";
import { initBehaviors } from "./behaviors";

Dotenv.config();

["BOT_TOKEN", "DB_URI"].forEach(it => {
  if (!process.env[it]) {
    console.error(`Please provide ${Chalk.red(it)} variable!`);
    process.exit(1);
  }
});

const botToken = process.env.BOT_TOKEN;
const dbUri = process.env.DB_URI;
const debugServer = process.env.DEBUG_SERVER;

const client = new Discord.Client();

console.debug(`Logging in the bot using token ${Chalk.yellow(botToken)}...`);
client.login(botToken)
  .then(() => {
    console.log(`Bot logged in as ${Chalk.green(client.user.username)}!`);

    initBehaviors(client, debugServer);

    console.debug(`Connecting to the database on ${Chalk.yellow(dbUri)}...`);
    Mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((res) => {
        for (const connection of res.connections) {
          console.log(`Connected to the database ${Chalk.green(connection.name)}!`);
        }
      })
      .catch((err: Error) => {
        console.error(`Failed to connect to the database! ${Chalk.red(err.message)}`);
        process.exit(1);
      });
  })
  .catch((err: Error) => {
    console.error(`Failed to login the bot! ${Chalk.red(err.message)}`);
    process.exit(1);
  });
