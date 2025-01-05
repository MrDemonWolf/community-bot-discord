import { z } from "zod";
import dotenv from "dotenv";
import consola from "consola";

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .refine((url) => url.startsWith("postgres"), "Invalid database URL"),
  DISCORD_APPLICATION_ID: z.string(),
  DISCORD_APPLICATION_PUBLIC_KEY: z.string(),
  DISCORD_APPLICATION_BOT_TOKEN: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  consola.error({
    message: "Invalid environment variables found",
    additional: JSON.stringify(parsed.error.format(), null, 4),
    badge: true,
    timestamp: new Date(),
  });
  process.exit(1);
}

export const env = parsed.data;
