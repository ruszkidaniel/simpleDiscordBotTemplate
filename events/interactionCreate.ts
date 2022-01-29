import { ButtonInteraction, CommandInteraction, Interaction, SelectMenuInteraction } from "discord.js";
import { buttonInteraction, commandInteraction, menuInteraction } from "../interactions";

export function interactionCreate(interaction: Interaction) {
    if(interaction instanceof CommandInteraction) {
        commandInteraction(interaction);
    }
    else if(interaction instanceof ButtonInteraction) {
        buttonInteraction(interaction);
    }
    else if(interaction instanceof SelectMenuInteraction) {
        menuInteraction(interaction);
    }
}