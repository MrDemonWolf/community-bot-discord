import type { Client } from "discord.js";
import { PrismaClient } from "@prisma/client";

import consola from "consola";

export async function readyEvt(client: Client) {
  if (!client.user)
    return consola.error({
      message: `[Discord Event Logger - ReadyEvt] Discord bot is not ready`,
      badge: true,
      level: "error",
      timestamp: new Date(),
    });

  consola.ready({
    message: "Discord bot is ready! 🐺 🐾",
    badge: true,
    timestamp: new Date(),
  });

  /**
   * Load Prsima Client and connect to Prisma Server if failed to connect, throw error.
   */
  const prisma = new PrismaClient();

  prisma
    .$connect()
    .then(async () => {
      await prisma.$disconnect();
      consola.success({
        message: `Prisma: Connected`,
        badge: true,
      });
    })
    .catch(async (err: any) => {
      consola.error({
        message: `[Prisma] Failed to connect: ${err.message}`,
        badge: true,
        timestamp: new Date(),
      });
      process.exit(1);
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
}
