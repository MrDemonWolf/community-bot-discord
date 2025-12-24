import { MessageFlags } from "discord.js";

import type { Client, Interaction, CommandInteraction } from "discord.js";

import logger from "../utils/logger.js";

/**
 * Import slash commands from the commands folder.
 */

export async function interactionCreateEvent(
  client: Client,
  interaction: Interaction
) {
  try {
    if (!interaction.isCommand()) {
      return;
    }

    logger.commands.executing(
      "interactionCreate",
      interaction.user.username,
      interaction.user.id
    );

    const { commandName } = interaction;

    if (!commandName) {
      return;
    }
  } catch (err) {
    logger.error("Discord - Command", "Error executing command", err, {
      user: { username: interaction.user.username, id: interaction.user.id },
      command: interaction.isCommand() ? interaction.commandName : "unknown",
    });

    const interactionWithError = interaction as CommandInteraction;

    await interactionWithError.reply({
      content: "There was an error while executing this command!",
      flags: MessageFlags.Ephemeral,
    });
  }
}
