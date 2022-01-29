import { DiscordBot } from "../../bot";
import { Channels } from "../../constants";

export function logUserPresenceChange(member: string, joined: boolean) {
    const emoji     = joined ? 'green' : 'red';
    const action    = joined ? 'csatlakozott' : 'lecsatlakozott';
    const name      = `${member}`;
    const members   = DiscordBot.getMemberCount();

    let eventMessage = `[${getTime()}] :${emoji}_square: Egy tag ${action}: **${name}** (Tagok: ${members})`;

    DiscordBot.sendMessage(Channels.JOIN_LOG, eventMessage);
}

function getTime() {
	let d = new Date();
	return d.getHours().toString().padStart(2, '0') + ":" + 
        d.getMinutes().toString().padStart(2, '0') + ":" + 
        d.getSeconds().toString().padStart(2, '0');
}