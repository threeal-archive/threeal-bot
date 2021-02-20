import { initRobot } from "./robot";
import { initStore } from "./store";
import * as dotenv from "dotenv";
import * as chalk from "chalk";

dotenv.config();

function checkEnvVariable(variable: string) {
  if (!process.env[variable]) {
    console.error(`Please provide ${chalk.red(variable)} variable!`);
    process.exit(1);
  }
}

["BOT_TOKEN", "DB_URI"].forEach(it => checkEnvVariable(it));

initRobot(process.env.BOT_TOKEN)
  .then(() => {
    initStore(process.env.DB_URI)
      .catch((err: Error) => {
        console.error(`Failed to initialize the store! ${chalk.red(err.message)}`);
        process.exit(1);
      });
  })
  .catch((err: Error) => {
    console.error(`Failed to initialize the robot! ${chalk.red(err.message)}`);
    process.exit(1);
  });
