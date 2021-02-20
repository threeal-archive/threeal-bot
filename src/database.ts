import * as mongoose from "mongoose";
import * as chalk from "chalk";

export interface Database {
  mongoose: mongoose.Mongoose;
}

export function connectDatabase(uri: string): Database {
  console.log(`Connecting to the database on ${chalk.green(uri)}`);
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res: mongoose.Mongoose) => {
      for (const connection of res.connections) {
        console.log(
          `Connected to the database ${chalk.green(connection.name)}!`
        );
      }
    })
    .catch((err: Error) => {
      console.log(
        `Failed to connect to the database! ${chalk.red(err.message)}`
      );
    });

  return {
    mongoose: mongoose,
  };
}
