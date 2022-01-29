import { CommandInteraction } from "discord.js";
import { FunctionObject, PlayerNotFoundMessagePayload } from "../types";

export function playerNotFound(interaction: CommandInteraction, editReply: boolean = false) {
    const messagePayload: PlayerNotFoundMessagePayload = { content: 'A keresett játékos nem található!' };
    const reply = editReply ? 'editReply' : 'reply';

    if(!editReply) {
        messagePayload.ephemeral = true;
    }
    interaction[reply](messagePayload);
}

export function replyToInteraction(interaction: CommandInteraction, content: string) {
    interaction.reply({
        content,
        ephemeral: true
    })
}

export const manageCommands: FunctionObject = {
}