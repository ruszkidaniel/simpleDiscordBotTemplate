import { MessageActionRowOptions } from "discord.js";

export const sampleComponent = (user: string): MessageActionRowOptions[] => [{
    type: 'ACTION_ROW',
    components: [{
        type: 'BUTTON',
        label: 'Continue',
        emoji: '✅',
        style: 'SUCCESS',
        customId: `continue_sample_${user}`
    },{
        type: 'BUTTON',
        label: 'Cancel',
        emoji: '❌',
        style: 'DANGER',
        customId: `cancel_sample`,
    }]
}];