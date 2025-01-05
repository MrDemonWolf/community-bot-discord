import { Client, Events, GatewayIntentBits } from "discord.js";

import { env } from "./utils/env";
import { prismaConnect } from "./database";
/**
 * Import Environment variables
 */
const DISCORD_TOKEN = env.DISCORD_APPLICATION_BOT_TOKEN;

/**
 * Import Event handlers
 */
import { readyEvt } from "./events/ready";
/**
 * Init Discord client
 */
export const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

/**
 * Discord bot event listeners
 */
client.on(Events.ClientReady, () => {
  readyEvt(client);
});

/**
 * Connect to the database
 */
prismaConnect();

/**
 * Start Discord bot
 */
client.login(DISCORD_TOKEN);

export default client;
