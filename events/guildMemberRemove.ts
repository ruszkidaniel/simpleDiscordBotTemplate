import { GuildMember, PartialGuildMember } from "discord.js";
import { logUserPresenceChange } from "./guildMemberLog";

export function guildMemberRemove(member: GuildMember | PartialGuildMember) {
    //logUserPresenceChange(member.user?.tag || 'n/a', false);
}