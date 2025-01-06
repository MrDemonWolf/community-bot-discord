import type { Guild } from "discord.js";
import consola from "consola";

import { prisma } from "../database";

export async function guildDelete(guild: Guild) {
  try {
    const guildExists = await prisma.discordGuild.findUnique({
      where: { guildId: guild.id },
    });

    if (!guildExists) {
      return consola.info({
        message: `[Discord Event Logger - GuildDeleteEvt] Skipping non-existent guild ${guild.name} (ID: ${guild.id})`,
        badge: true,
      });
    }

    await prisma.discordGuild.delete({
      where: { guildId: guild.id },
    });

    consola.success({
      message: `[Discord Event Logger - GuildDeleteEvt] Deleted guild ${guild.name} (ID: ${guild.id}) from the database`,
      badge: true,
    });
  } catch (err) {
    consola.error({
      message: `[Discord Event Logger - GuildDeleteEvt] Error deleting guild from database: ${err}`,
      badge: true,
      level: "error",
      timestamp: new Date(),
    });
  }
}
