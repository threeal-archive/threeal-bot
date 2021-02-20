# Threeal Bot

Personal [Discord](https://discord.com/) bot using [Discord.js](https://discord.js.org/#/).

## Project Setup

- Install [Node.js](https://nodejs.org/en/) as in their [official guide](https://nodejs.org/en/download/).
  > As an alternative, you may install Node.js using [NVM](https://github.com/nvm-sh/nvm).
- Install [MongoDB](https://www.mongodb.com/) as in their [official guide](https://docs.mongodb.com/manual/installation/).
- Install [Yarn](https://yarnpkg.com/) as in their [official guide](https://classic.yarnpkg.com/en/docs/install/).
  > If you don't want to use Yarn, you may skip this step and use [NPM](https://www.npmjs.com/) (the default of Node.js) instead.
- Open this project directory in terminal, and initialize the dependencies.
  ```bash
  $ yarn install
  ```
- Create a `.env` file in this project directory and fill the content as follows:
  ```
  DB_URI=mongodb://user:pass@localhost:27017/db
  ```
  > Replace the `DB_URI` value with the value of your MongoDB's URI.

## Bot Setup

- Open the [Discord developer portal](https://discord.com/developers/applications) and log into your account.
- Click on the `New Application` button to create a new app.
- Select `Bot` tab and then click on the `Add Bot` button to create a new bot.
- Add a new value in `.env` file as follows:
  ```
  BOT_TOKEN=NzkyNzE1NDU0MTk2MDg4ODQy.X-hvzA.Ovy4MCQywSkoMRRclStW4xAYK7I
  ```
  > Replace the `BOT_TOKEN` value with the value of your bot's token.

## Usage

- (Optional) set optional value in `.env` file as follows:
  - `DEBUG_SERVER`, makes bot only able to interact on specific server.
- Check code lint.
  ```bash
  $ yarn lint
  ```
- Compile from [TypeScript](https://www.typescriptlang.org/) to [JavaScript](https://www.javascript.com/).
  ```bash
  $ yarn build
  ```
- Start the bot.
  ```bash
  $ yarn start
  ```
