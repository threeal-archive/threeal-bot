import * as mongoose from "mongoose";
import * as chalk from "chalk";

export interface Store {
  mongoose: mongoose.Mongoose;
}

export async function initStore(dbUri: string): Promise<Store> {
  console.debug(`Connecting to the database on ${chalk.yellow(dbUri)}...`);
  const res = await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

  for (const connection of res.connections) {
    console.log(`Connected to the database ${chalk.green(connection.name)}!`);
  }

  return {
    mongoose: mongoose,
  };
}
