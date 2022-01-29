import { CommandInteraction, MessageOptions, TextChannel } from "discord.js";
import * as logger from "npmlog";
import { SayCommandOptions } from "./types";

export function sayCommand(interaction: CommandInteraction) {
    const { channel, message, embedded } = getOptions(interaction);
    if(!(channel instanceof TextChannel)) {
        return interaction.reply({
            embeds: [{title: 'Csak szöveges szobába írhatsz üzenetet a bottal!'}],
            ephemeral: true
        })
    }

    const output: MessageOptions = embedded ? { embeds: [{ title: message }] } : { content: message };
    (channel as TextChannel).send(output);
    interaction.reply({
        content: 'Üzenet elküldve.',
        ephemeral: true
    });

    logger.verbose('SAY', 'Message sent to channel %s by %s (id: %s)', (interaction.channel as TextChannel).name, interaction.user.username, interaction.user.id);
}

function getOptions(interaction: CommandInteraction): SayCommandOptions {
    return {
        channel: interaction.options.getChannel('szoba', true),
        message: interaction.options.getString('üzenet', true),
        embedded: interaction.options.getBoolean('kiemelt', false) || false
    }
}
