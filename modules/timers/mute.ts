import { GuildMember } from "discord.js";
import { DiscordBot } from "../../bot";
//import { Channels, EmbedColors, Roles } from "../../constants";
import { Database } from "../../modules/database";
import { DatabaseMuteRow } from "../../types";
import * as logger from 'npmlog';

export class MuteTimerClass {

    private static timer: any = null;

    public static startTimer() {
        if(MuteTimerClass.timer) return;

        MuteTimerClass.timer = setInterval(MuteTimerClass.tick, 60e3);
    }

    private static async tick() {
        /*const mutes: any = await Database.getMutedUsers();
        const currentDate = new Date();

        mutes.forEach((mute: DatabaseMuteRow) => {
            if(!mute.endDate || currentDate < mute.endDate) return;

            Database.removeMutedUser(mute.targetId);
            DiscordBot.removeMemberRole(mute.targetId, Roles.MUTED);
            MuteTimerClass.sendUnmuteNotification(mute.issuerId, mute.targetId, mute.reason);
        })*/
    }
/*
    private static async sendUnmuteNotification(issuerId: string, targetId: string, reason: string) {
        const reasonString = reason ? '(Indok: ``' + reason + '``)' : '';
        const issuerName = (await DiscordBot.getMemberInGuild(issuerId) as GuildMember)?.displayName || 'ismeretlen';
        const targetName = (await DiscordBot.getMemberInGuild(targetId) as GuildMember)?.displayName || 'ismeretlen';
        
        DiscordBot.sendMessage(Channels.MOD_CHANNEL, {
            embeds: [{
                title: 'Lejárt némítás',
                description: `Lejárt **${targetName}** némítása, amit ${issuerName} osztott ki.\n${reasonString}`,
                color: EmbedColors.Green
            }]
        });
        logger.info('TIMERS-MUTE', 'Unmuted %s (%s)', targetName, targetId);
    }
*/
}