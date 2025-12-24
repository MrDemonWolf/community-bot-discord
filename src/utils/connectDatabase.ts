import { PrismaClient } from "../prisma/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

import env from "../utils/env.js";
import { consola } from "consola";

export async function connectDatabase() {
  /**
   * Load Prsima Client and connect to Prisma Server if failed to connect, throw error.
   */
  const adapter = new PrismaPg({
    connectionString: env.DATABASE_URL,
  });
  const prisma = new PrismaClient({
    adapter,
  });

  await prisma
    .$connect()
    .then(async () => {
      await prisma.$disconnect();
      return consola.ready({
        message: `[Discord Event Logger - ReadyEvt] Connected to Prisma Server`,
        badge: true,
      });
    })
    .catch((err: any) => {
      consola.error({
        message: `[Discord Event Logger - ReadyEvt] Failed to connect to Prisma Server: ${err}`,
        badge: true,
        timestamp: new Date(),
      });
      process.exit(1);
    });
}
