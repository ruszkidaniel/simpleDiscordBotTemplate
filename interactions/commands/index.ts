import { ApplicationCommandOptionType } from "discord-api-types";
import { CommandInteraction, GuildMember, User } from "discord.js";
import { DiscordBot } from "../../bot";
/*import { Roles } from "../../constants";*/ const Roles: any = {};
//import { muteCommand as mute } from "./mute";
import { sayCommand as say } from "./say";
//import { unmuteCommand as unmute } from "./unmute";
import { clearCommand as clear } from "./clear";
import { manageCommand as manage } from './manage';

const managementRolePermissions = [
    { id: Roles.OWNER, type: 'ROLE', permission: true },
    { id: Roles.ADMIN_CONTROLLER, type: 'ROLE', permission: true },
    { id: Roles.SUPER_ADMIN, type: 'ROLE', permission: true },
    { id: Roles.HEAD_ADMIN, type: 'ROLE', permission: true },
    { id: Roles.SCRIPTER, type: 'ROLE', permission: true },
];

const moderatorRolePermissions = [
    { id: Roles.SERVER_ADMIN, type: 'ROLE', permission: true },
    { id: Roles.OPERATOR, type: 'ROLE', permission: true },
    { id: Roles.MODERATOR, type: 'ROLE', permission: true },
];

export const commandList = [
    /**
     * @command manage
     * 
     * @access O + AC + SC && constants.ts:Manage
     */
    {
        name: 'manage',
        description: 'Rendszergazda parancs.',
        default_permission: false,
        options: [{
            name: 'parancs',
            description: 'Futtatandó parancs',
            type: ApplicationCommandOptionType.String,
            required: true
        }],
        permissions: [
            { id: Roles.OWNER, type: 'ROLE', permission: true },
            { id: Roles.ADMIN_CONTROLLER, type: 'ROLE', permission: true },
            { id: Roles.SCRIPTER, type: 'ROLE', permission: true }
        ]
    },

    /**
     * @command mute
     * 
     * @access management + moderator
     */
    /*{
        name: 'mute',
        description: 'Egy felhasználó némítása bizonyos ideig.',
        default_permission: false,
        options: [
            {
                name: 'felhasználó',
                description: 'A felhasználó akit némítani szeretnél.',
                type: ApplicationCommandOptionType.User,
                required: true
            }, 
            {
                name: 'mennyiség',
                description: 'Az idő amennyire némítod.',
                type: ApplicationCommandOptionType.Integer,
                required: true
            }, 
            {
                name: 'mértékegység',
                description: 'A némítás mértékegysége.',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [{
                    name: 'perc',
                    value: 'minute'
                },{
                    name: 'óra',
                    value: 'hour'
                },{
                    name: 'nap',
                    value: 'day'
                },{
                    name: 'hét',
                    value: 'week'
                }] 
            },
            {
                name: 'indok',
                description: 'Némítás indoka.',
                type: ApplicationCommandOptionType.String,
                required: false,
            }, 
        ],
        permissions: [
            ...managementRolePermissions,
            ...moderatorRolePermissions
        ],
    },*/

    /**
     * @command unmute
     * 
     * @access management + moderator
     */
    /*{
        name: 'unmute',
        description: 'Egy felhasználó némításának feloldása.',
        default_permission: false,
        options: [
            {
                name: 'felhasználó',
                description: 'Némított felhasználó.',
                type: ApplicationCommandOptionType.User,
                required: true,
            }, 
        ],
        permissions: [
            ...managementRolePermissions,
            ...moderatorRolePermissions
        ]
    },*/

    /**
     * @command clear
     * 
     * @access management
     */
    /*{
        name: 'clear',
        description: 'Megadott számú üzenet törlése a szobából.',
        default_permission: false,
        options: [
            {
                name: 'mennyiség',
                description: 'Törölni kívánt üzenetmennyiség.',
                type: ApplicationCommandOptionType.Integer,
                required: true,
            }, 
        ],
        permissions: [
            ...managementRolePermissions
        ]
    },*/

    /**
     * @command say
     * 
     * @access management
     */
    /*{
        name: 'say',
        description: 'Bot-üzenet küldése egy adott szobába.',
        default_permission: false,
        options: [
            {
                name: 'szoba',
                description: 'Célszoba neve',
                type: ApplicationCommandOptionType.Channel,
                required: true,
            }, 
            {
                name: 'üzenet',
                description: 'Üzenet',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'kiemelt',
                description: 'Kiemelten írja az üzenetet?',
                type: ApplicationCommandOptionType.Boolean,
                required: false
            }
        ],
        permissions: [
            ...managementRolePermissions
        ]
    },*/
];

export function checkRole(commandName: String, availableRoles: Array<String>) {
    const permissionedRoles = commandList.find(command => command.name == commandName)?.permissions.map(perm => perm.id);
    const intersection = permissionedRoles?.filter(role => availableRoles.includes(role)) || [];
    return intersection?.length > 0;
}

export async function fetchNames(interaction: CommandInteraction, target: User): Promise<{ issuerName: string; targetName: string; }> {
    const issuerName = (interaction.member as GuildMember).displayName;
    const targetName = (await DiscordBot.getMemberInGuild(target.id))?.displayName || 'ismeretlen';
    return {issuerName, targetName};
}

export function invalidRole(interaction: CommandInteraction) {
    interaction.reply({
        content: 'Jogosultsági probléma.',
        ephemeral: true
    });
}

export const registeredCommands = {
    //mute,
    //unmute,
    say,
    clear,
    manage
}