import { Client, Events, GatewayIntentBits } from "discord.js";
import consola from "consola";

import { env } from "./utils/env";
import { prismaConnect } from "./database";
import api from "./api";

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
 * Start API server.
 */
api.listen(api.get("port"), () => {
  consola.ready({
    message: `[API] Listening on http://${api.get("host")}:${api.get("port")}`,
    badge: true,
    timestamp: new Date(),
    level: "info",
  });
});

api.on("error", (err) => {
  consola.error({
    message: `[API] ${err}`,
    badge: true,
    timestamp: new Date(),
    level: "error",
  });
  process.exit(1);
});

/**
 * Start Discord bot
 */
client.login(DISCORD_TOKEN);
