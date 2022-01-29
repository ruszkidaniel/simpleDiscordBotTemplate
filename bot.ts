import { Client, Collection, Guild, GuildMember, Invite, Message, MessageOptions, TextChannel } from "discord.js";
import { guildMemberAdd, guildMemberRemove, interactionCreate, inviteCreate, ready } from "./events";
import { commandList } from "./interactions/commands";
import * as logger from 'npmlog';

export class DiscordBot {

    private static bot: Client;
    private static guild: Guild;
    //private static invites: Collection<string, Invite>;
    
    private constructor() {}

    public static getInstance(): Client {
        if(!DiscordBot.bot) {
            DiscordBot.initializeBot();
        }
     
        return DiscordBot.bot;
    }

    private static initializeBot(): void {
        DiscordBot.bot = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_PRESENCES', 'GUILD_MEMBERS', 'GUILD_INVITES']});
        DiscordBot.authorizeBot();
        DiscordBot.registerHandlers();
    }
    
    /**
     * Sets the required permissions to the registered guild commmands.
     */
    public static async addCommandPermissions() {
        const commands = await DiscordBot.bot.guilds.cache.get(process.env.GUILD_ID as string)!.commands.fetch();
        const commandPermissions: any = {};

        commandList.forEach(command => { commandPermissions[command.name] = command.permissions });

        commands.forEach((command) => {
            const permissionArray = commandPermissions[command.name];
            command.permissions.set({ permissions: permissionArray });
        });
        
        logger.info('DISCORD', 'Synced %i command permissions', commands.size);
    }
    
    private static authorizeBot(): void {
        DiscordBot.bot.login(process.env.BOT_TOKEN);
    }

    public static setGuild() {
        const guild = DiscordBot.bot.guilds.cache.get(process.env.GUILD_ID!);
        if(!guild) {
            logger.info('DISCORD', 'Bot is not invited to the configured guild, application stops.');
            return process.exit();
        }
        DiscordBot.guild = guild;
    }
    
    private static registerHandlers(): void {
        DiscordBot.bot.on('ready', ready);
        //DiscordBot.bot.on('interactionCreate', interactionCreate);
        //DiscordBot.bot.on('guildMemberAdd', guildMemberAdd);
        //DiscordBot.bot.on('guildMemberRemove', guildMemberRemove);
        //DiscordBot.bot.on('inviteCreate', inviteCreate);
    }

    public static sendMessage(channelId: string, message: MessageOptions | string) {
        const guild = DiscordBot.bot.guilds.cache.get(process.env.GUILD_ID!);
        const channel = guild?.channels.cache.get(channelId) as TextChannel;
        if(channel) {
            channel.send(message);
        } else {
            logger.info('DISCORD', 'Channel with id %s not found.', channelId);
        }
    }
    
    public static async getMemberInGuild(userId: string): Promise<GuildMember | null> {
        return await DiscordBot.guild.members.fetch(userId).catch(() => null);
    }

    public static getMemberCount(): number {
        return DiscordBot.guild.memberCount || 0;
    }
    /*
    public static fetchInvites() {
        return DiscordBot.guild.invites.fetch();
    }

    public static getInvites(): Collection<string, Invite> {
        return DiscordBot.invites;
    }

    public static storeInvites(invites: Collection<string, Invite>) {
        DiscordBot.invites = invites;
    }
    */
    public static async getLastMessageInChannel(channelId: string): Promise<Message | null> {
        const channel = DiscordBot.guild.channels.cache.get(channelId);
        if(!channel) return null;

        const fetchedMessages = await (channel as TextChannel).messages.fetch({ 'limit': 1 });
        return fetchedMessages.last() || null;
    }
    
    public static async addMemberRole(targetId: string, roleId: string) {
        (await DiscordBot.getMemberInGuild(targetId))?.roles.add(roleId);
    }
    
    public static async removeMemberRole(targetId: string, roleId: string) {
        (await DiscordBot.getMemberInGuild(targetId))?.roles.remove(roleId);
    }

    public static async fetchMessage(channelId: string, messageId: string): Promise<Message | null> {
        const channel = DiscordBot.guild.channels.cache.get(channelId);
        if(!channel || !(channel instanceof TextChannel)) return null;
        
        const message = await channel.messages.fetch(messageId);
        if(!message) return null;

        return message;
    }

    public static async fetchChannelMessages(channelId: string, limit: number = 100) {
        const channel = DiscordBot.guild.channels.cache.get(channelId);
        if(!channel || !(channel instanceof TextChannel)) return null;
        
        const message = await channel.messages.fetch({limit});
    }
/*
    public static updateChannelTopic(channelId: string, newTopic: string) {
        const channel = DiscordBot.guild.channels.cache.get(channelId);
        if(!channel || !(channel instanceof TextChannel)) return null;
        
        channel.setTopic(newTopic);
    }
*/
}