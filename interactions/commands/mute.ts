import { CommandInteraction, GuildMember, Message } from "discord.js";
import { fetchNames } from ".";
import { DiscordBot } from "../../bot";
import { Channels, EmbedColors, MAX_MUTE_TIME, Roles } from "../../constants";
import { Database } from "../../modules/database";
import { MuteCommandOptions } from "./types";
import * as logger from 'npmlog';

// Command
/*
export async function muteCommand(interaction: CommandInteraction) {
    const {target, duration, unit, reason} = getOptions(interaction);
    const {issuerName, targetName} = await fetchNames(interaction, target);
    const {totalSeconds, endDate} = calculateEndDate(duration, unit);
    
    if(await checkIfMuted(target.id)) {
        return replyAlreadyMuted(interaction);
    }

    if(checkMaxTime(totalSeconds)) {
        return replyMaxTimeExceeded(interaction);
    }

    const issuerMember = (await DiscordBot.getMemberInGuild(interaction.user.id))!;
    const targetMember = (await DiscordBot.getMemberInGuild(target.id))!;

    if(targetMember.roles.highest.position > issuerMember.roles.highest.position) {
        return targetRoleIsHigher(interaction, targetMember);
    }

    muteUser(interaction, target.id, interaction.user.id, endDate, reason, issuerName, duration, unit);
    logger.verbose('MUTE', 'User %s (id: %s) muted user %s (id: %s) - till %s', issuerMember.displayName, issuerMember.id, targetMember.displayName, targetMember.id, endDate);
}

export function muteUser(interaction: CommandInteraction | Message, targetID: string, senderID: string, endDate: Date, reason: string | null, issuerName: string, duration: number, unit: string) {
    DiscordBot.addMemberRole(targetID, Roles.MUTED);
    Database.addMutedUser(senderID, targetID, endDate, reason);
    replyToInteraction(interaction, targetID, issuerName, duration, unit, reason);
}

function getOptions(interaction: CommandInteraction): MuteCommandOptions {
    return {
        target: interaction.options.getUser('felhasználó', true),
        duration: interaction.options.getInteger('mennyiség', true),
        unit: interaction.options.getString('mértékegység', true),
        reason: interaction.options.getString('indok')
    };
} */

// Checks
/*
export async function checkIfMuted(id: string) {
    return Database.isUserMuted(id);
}

function checkMaxTime(totalSeconds: number) {
    return totalSeconds > MAX_MUTE_TIME;
}

function replyMaxTimeExceeded(interaction: CommandInteraction) {
    interaction.reply({
        embeds: [{title: 'A némítás ideje maximum 4 hét lehet!'}],
        ephemeral: true
    });
}

function replyAlreadyMuted(interaction: CommandInteraction) {
    interaction.reply({
        embeds: [{title: 'Ez a felhasználó már némítva van!'}],
        ephemeral: true
    });
}*/

// Helpers
/*
function unitToSeconds(unit: string) {
    if(unit == 'minute') return 60;
    else if(unit == 'hour') return 60*60; 
    else if(unit == 'day') return 60*60*24; 
    else if(unit == 'week') return 60*60*24*7;
    return 0;
}

function unitToHungarian(unit: string) {
    if(unit == 'minute') return 'percre';
    else if(unit == 'hour') return 'órára'; 
    else if(unit == 'day') return 'napra'; 
    else if(unit == 'week') return 'hétre';
    else if(unit == 'year') return 'évre';
    return 'valamire. (ismeretlen)';
}

function calculateEndDate(duration: number, unit: string): { totalSeconds: number; endDate: Date; } {
    const totalSeconds = duration * unitToSeconds(unit);
    const endDate = new Date();
    endDate.setSeconds(endDate.getSeconds() + totalSeconds);
    return { totalSeconds, endDate };
}

function replyToInteraction(interaction: CommandInteraction | Message, targetId: string, issuerName: string, duration: number, unit: string, reason: string | null) {
    reason = reason ? '\n\n**A némítás oka:**\n' + reason : '';
    const reply = {
        embeds: [{
            'title': 'Felhasználó némítva',
            'description': `:warning: **<@${targetId}>** némítva lett **${issuerName}** által **${duration} ` +
                            `${unitToHungarian(unit)}**!${reason}`,
            'color': EmbedColors.Red
        }]
    };
    interaction.reply(reply);
    if(interaction.channelId != Channels.MOD_CHANNEL) {
        DiscordBot.sendMessage(Channels.MOD_CHANNEL, reply);
    }
}

function targetRoleIsHigher(interaction: CommandInteraction, targetMember: GuildMember) {
    interaction.reply({
        content: `Rajta nagyobb rang van, így nem teheted ezt meg.`,
        ephemeral: true
    });

    DiscordBot.sendMessage(Channels.MANAGEMENT, {
        embeds: [{
            title: 'Biztonsági figyelmeztető',
            description: `**${interaction.user.tag}** némítani akarta **${targetMember.displayName}** felhasználót kisebb ranggal.`,
            color: EmbedColors.Red
        }]
    });
}
*/