import { DiscordBot } from "../bot";
import * as logger from 'npmlog';

export async function ready() {
    logger.info('DISCORD', 'Bot ready');
    
    DiscordBot.addCommandPermissions();
    DiscordBot.setGuild();

    //const invites = await DiscordBot.fetchInvites();
    //DiscordBot.storeInvites(invites);
    //logger.info('DISCORD', 'Fetched invites: %i', invites.size);
}
