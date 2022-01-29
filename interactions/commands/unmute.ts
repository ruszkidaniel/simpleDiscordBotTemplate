import { CommandInteraction } from "discord.js";
import { fetchNames } from ".";
import { DiscordBot } from "../../bot";
import { EmbedColors, Roles } from "../../constants";
import { Database } from "../../modules/database";
//import { checkIfMuted } from "./mute";
import * as logger from 'npmlog';
/*
export async function unmuteCommand(interaction: CommandInteraction) {
    const { target } = getOptions(interaction);
    const {issuerName, targetName} = await fetchNames(interaction, target);

    if(!await checkIfMuted(target.id)) {
        return replyNotMuted(interaction);
    }

    const issuerMember = (await DiscordBot.getMemberInGuild(interaction.user.id))!;
    const targetMember = (await DiscordBot.getMemberInGuild(target.id))!;

    (await DiscordBot.getMemberInGuild(target.id))?.roles.remove(Roles.MUTED);
    Database.removeMutedUser(target.id);
    replyToInteraction(interaction, issuerName, targetName);
    logger.verbose('UNMUTE', 'User %s (id: %s) unmuted user %s (id: %s)', issuerMember.displayName, issuerMember.id, targetMember.displayName, targetMember.id);
}


function getOptions(interaction: CommandInteraction) {
    return {
        target: interaction.options.getUser('felhasználó', true)
    };
}

function replyNotMuted(interaction: CommandInteraction) {
    interaction.reply({
        embeds: [{title: 'Ez a felhasználó nincsen némítva!'}],
        ephemeral: true
    });
}

function replyToInteraction(interaction: CommandInteraction, issuerName: string, targetName: string) {
    interaction.reply({
        embeds: [{
            title: 'Némítás feloldva',
            description: `:white_check_mark: **${issuerName}** feloldotta **${targetName}** némítását.`,
            color: EmbedColors.Green
        }]
    });
}*/