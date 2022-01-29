import { SelectMenuInteraction } from "discord.js";
import { Database } from "../../modules/database";

export function sampleMenu(interaction: SelectMenuInteraction, action: string, args: string[]) {
    switch(action) {
        case 'getdata':
            sendSampleData(interaction, args);
            break;
        default: interaction.reply({content: 'Ismeretlen művelet.', ephemeral: true});
    }
}

async function sendSampleData(interaction: SelectMenuInteraction, args: string[]) {
    const [sampleValue] = args;

    //const ranks = await Database.selectQueryTemplate(sampleValue);

    await interaction.deferReply({ ephemeral: true });
    interaction.editReply({content:'reply'});
}