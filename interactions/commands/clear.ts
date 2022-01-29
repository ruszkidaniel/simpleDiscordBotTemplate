import { CommandInteraction, TextChannel } from "discord.js";
import { ClearCommandOptions } from "./types";
import * as logger from 'npmlog';

export function clearCommand(interaction: CommandInteraction) {
    const { amount } = getOptions(interaction);

    (interaction.channel as TextChannel).bulkDelete(amount);
    logger.verbose('CLEAR', 'Cleared %d messages in channel %s (id: %s)', amount, (interaction.channel as TextChannel).name, interaction.channelId);
    interaction.reply({
        content: `${amount} üzenet törölve!`,
        ephemeral: true
    });
}

export function getOptions(interaction: CommandInteraction): ClearCommandOptions {
    return {
        amount: interaction.options.getInteger('mennyiség', true) || 0
    }
}
