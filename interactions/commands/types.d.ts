import { User } from "discord.js";

export type MuteCommandOptions = {
    target: User,
    duration: number,
    unit: string,
    reason: string | null
};

export type OmuteCommandOptions = {
    targetId: string;
};

export type SayCommandOptions = {
    channel: GuildChannel;
    message: string;
    embedded: boolean
};

export type ClearCommandOptions = {
    amount: number;
};

export type KickCommandOptions = {
    target: User;
    reason: string | null;
};

export type AjCommandOptions = {
    target: string;
    minutes: number;
    reason: string;
};

export type UnajCommandOptions = {
    target: string;
};

export type BanCommandOptions = {
    target: string;
    days: number;
    reason: string;
};

export type WarnCommandOptions = {
    target: any;
};

export type AdminchatCommandOptions = {
    message: string;
};

export type AschatCommandOptions = {
    message: string;
};

export type SetadminCommandOptions = {
    target: string;
    level: number;
};

export type GiveppCommandOptions = {
    target: string;
    amount: number;
};

export type PlayerNotFoundMessagePayload = {
    content: string;
    ephemeral?: boolean;
};

export type FunctionObject = {
    [key: string]: Function;
};