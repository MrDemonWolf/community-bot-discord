import type { Guild } from "discord.js";
import consola from "consola";

import { prisma } from "../database";

export async function guildCreate(guild: Guild) {
  try {
    const existingGuild = await prisma.guild.findUnique({
      where: { guildId: guild.id },
    });

    if (existingGuild) {
      return consola.info({
        message: `[Discord Event Logger - GuildCreateEvt] Skipping duplicate guild ${guild.name} (ID: ${guild.id})`,
        badge: true,
      });
    }

    await prisma.guild.create({
      data: {
        guildId: guild.id,
      },
    });

    consola.success({
      message: `[Discord Event Logger - GuildCreateEvt] Created guild ${guild.name} (ID: ${guild.id}) in the database`,
      badge: true,
    });
  } catch (err) {
    console.error({
      message: `[Discord Event Logger - GuildCreateEvt] Error creating guild in database: ${err}`,
      badge: true,
      level: "error",
      timestamp: new Date(),
    });
  }
}
