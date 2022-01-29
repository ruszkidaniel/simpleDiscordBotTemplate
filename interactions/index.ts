import { ButtonInteraction, CommandInteraction, GuildMember, SelectMenuInteraction } from "discord.js";
import { checkRole, invalidRole, registeredCommands } from './commands/index';
import * as registeredButtons from './buttons';
import * as registeredMenus from './menus';

let interactions: any = {
    commandInteractions: registeredCommands,
    buttonInteractions: registeredButtons,
    menuInteractions: registeredMenus
};

// HANDLERS

export function commandInteraction(interaction: CommandInteraction) {
    const commandName = interaction.commandName.toString();
    
    logCommand(interaction, commandName);
    
    if(checkCommandExist(commandName)) {
        runCommand(interaction, commandName);
    } else {
        unknownCommand(interaction);
    }
}

export function buttonInteraction(interaction: ButtonInteraction) {
    const [action, button, ...args] = interaction.customId!.split('_');

    if(checkButtonExists(button)) {
        runButton(interaction, button, action, args);
    } else {
        unknownButton(interaction);
    }
}

export function menuInteraction(interaction: SelectMenuInteraction) {
    const [action, menu, ...args] = interaction.values[0]!.split('_');

    if(checkMenuExists(menu)) {
        runMenu(interaction, menu, action, args);
    } else {
        unknownMenu(interaction);
    }
}

// CHECKS

function checkCommandExist(commandName: string) {
    return interactions.commandInteractions.hasOwnProperty(commandName);
}

function checkButtonExists(button: string) {
    return interactions.buttonInteractions.hasOwnProperty(button);
}

function checkMenuExists(menu: string) {
    return interactions.menuInteractions.hasOwnProperty(menu);
}

// RUN actions

function runCommand(interaction: CommandInteraction, commandName: string) {
    if(!checkRole(commandName, (interaction.member as any)._roles)) {
        invalidRole(interaction);
    } else {
        interactions.commandInteractions[commandName](interaction);
    }
}

function runButton(interaction: ButtonInteraction, buttonName: string, action: string, args: string[]) {
    switch(action) {
        case 'cancel':
            cancelButton(interaction);
            break;
        default:
            interactions.buttonInteractions[buttonName](interaction, action, args);
    }
}

function runMenu(interaction: SelectMenuInteraction, menuName: string, action: string, args: string[]) {
    interactions.menuInteractions[menuName](interaction, action, args);
}

// INVALIDS

function unknownCommand(interaction: CommandInteraction) {
    interaction.reply({
        content: 'Ez a parancs jelenleg nem működik.',
        ephemeral: true
    });
}

function unknownButton(interaction: ButtonInteraction) {
    interaction.reply({
        content: 'Ez a gomb jelenleg nem működik.',
        ephemeral: true
    });
}

function unknownMenu(interaction: SelectMenuInteraction) {
    interaction.reply({
        content: 'Ez a menü jelenleg nem működik.',
        ephemeral: true
    });
}

// HELPERS

async function cancelButton(interaction: ButtonInteraction) {
    interaction.message.components = [];
    await interaction.deferUpdate();
    interaction.editReply({
        embeds: [{ title: 'Folyamat sikeresen megszakítva.' }],
        components: []
    });
}

function logCommand(interaction: CommandInteraction, commandName: string) {
    console.log(`[DISCORD] ${(interaction.member as GuildMember).displayName || 'n/a'} issued the command: /${commandName}`);
}

export function numberToEmoji(level: number) {
    return ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][level] || 'x';
}
