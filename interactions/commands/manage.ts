import { CommandInteraction } from "discord.js";
import { manageCommands, replyToInteraction } from "./manage/index";
import * as logger from 'npmlog';
import { Management } from "../../constants";

export function manageCommand(interaction: CommandInteraction) {

    if(!checkPermission(interaction.user.id)) {
        return notEnoughtPermission(interaction);
    }

    const args = interaction.options.getString('parancs', true);
    const command = args.split(' ')[0]!;
    const executableCommand = command + 'Command';
    const executeArgs = args.substr(command.length).trim().split(' ');

    logger.verbose('MANAGE', '%s (id: %s) issued MANAGE command with subcommand %s (%d args)', interaction.user.username, interaction.user.id, command, executeArgs.length);
    
    if(executableCommand in manageCommands) {
        manageCommands[executableCommand](interaction, executeArgs);
    } else {
        replyToInteraction(
            interaction,
            'Ismeretlen utasítás.'
        );
    }

}

function notEnoughtPermission(interaction: CommandInteraction) {
    replyToInteraction(
        interaction,
        'Ehhez nincs elegendő jogosultságod.'
    );
    logger.notice('MANAGE', 'User %s (id: %s) tried to use MANAGE command without permission', interaction.user.username, interaction.user.id);
}

function checkPermission(targetID: string): boolean {
    return Management.includes(targetID);
}
