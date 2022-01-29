import { GuildMember, Invite } from "discord.js";
import { DiscordBot } from "../bot";
import { Channels, GUILD_INVITE_CODE, Roles } from "../constants";
import { Database } from "../modules/database";
import { logUserPresenceChange } from "./guildMemberLog";
import * as logger from 'npmlog';

export async function guildMemberAdd(member: GuildMember) {
    //logUserPresenceChange(member.user.tag, true);
    //muteIfNeeded(member.id);
    //logInviteUsage(member.user.tag);
}
/*
function getInviteUses() {
    const invites = DiscordBot.getInvites();
    const inviteUses: any = {};
    invites.forEach((inv: Invite) => { inviteUses[inv.code] = inv.uses; });
    return inviteUses;
}

async function muteIfNeeded(id: string) {
    const muted = await Database.isUserMuted(id);
    if(muted) {
        logger.info('DISCORD-EVENTS', 'Auto-muted user #%s', id);
        return DiscordBot.addMemberRole(id, Roles.MUTED);
    }
}

async function logInviteUsage(tag: string) {
    const inviteUses: any = Object.freeze(getInviteUses());
    const newInvites = await DiscordBot.fetchInvites();
    
	const invite = newInvites.find((inv: Invite) => {
        return inviteUses[inv.code] < inv.uses!;
    });
    
    if(invite && invite.code != GUILD_INVITE_CODE) {
        const inviter = await DiscordBot.getMemberInGuild(invite.inviter!.id);
        DiscordBot.sendMessage(
            Channels.JOIN_LOG,
            `${tag} **${inviter?.user.tag||'N/A'}** által jött fel. (${invite.uses})`
        );
    }
    
    DiscordBot.storeInvites(newInvites);
}
*/