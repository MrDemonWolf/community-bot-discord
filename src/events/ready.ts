import type { Client } from "discord.js";
import consola from "consola";

import { prisma } from "../database";
import { setActivity } from "../utils/setActivity";

export async function readyEvt(client: Client) {
  if (!client.user) {
    consola.error({
      message: `[Discord Event Logger - ReadyEvt] Discord bot is not ready`,
      badge: true,
      level: "error",
      timestamp: new Date(),
    });
    process.exit(1);
  }

  consola.ready({
    message: "[Discord Event Logger - ReadyEvt] Discord bot is ready",
    badge: true,
    timestamp: new Date(),
  });

  /**
   * Check if guilds exist in the database and add them if they don't.
   */
  const currentGuilds = await prisma.guild.findMany();

  const guildsToAdd = client.guilds.cache.filter(
    (guild) =>
      !currentGuilds.some((currentGuild) => currentGuild.guildId === guild.id)
  );

  guildsToAdd.forEach(async (guild) => {
    try {
      await prisma.guild.create({
        data: {
          guildId: guild.id,
        },
      });
      consola.success({
        message: `[Discord Event Logger - ReadyEvt] Created guild ${guild.name} (ID: ${guild.id}) in the database`,
        badge: true,
      });
    } catch (err) {
      console.error({
        message: `[Discord Event Logger - ReadyEvt] Error creating guild in database: ${err}`,
        badge: true,
        level: "error",
        timestamp: new Date(),
      });
    }
  });

  /**
   * Apply the bot's activity status also update every hour.
   */
  setActivity(client);
  setInterval(() => setActivity(client), 60 * 60 * 1000);
}
