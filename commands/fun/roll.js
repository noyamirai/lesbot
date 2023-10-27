import {
  ActionRowBuilder,
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("roll")
  .setDescription("Rolls a dice");

export async function execute(interaction) {
  const d4Dice = new ButtonBuilder()
    .setCustomId("4")
    .setLabel("D4 dice")
    .setStyle(ButtonStyle.Primary)
    .setEmoji("🎲");

  const d20Dice = new ButtonBuilder()
    .setCustomId("20")
    .setLabel("D20 dice")
    .setStyle(ButtonStyle.Primary)
    .setEmoji("🎲");

  const row = new ActionRowBuilder().addComponents(d4Dice, d20Dice);

  const response = await interaction.reply({
    content: "Select the type of dice to roll",
    ephemeral: true,
    components: [row],
  });

  const collectorFilter = (i) => i.user.id === interaction.user.id;
  try {
    const confirmation = await response.awaitMessageComponent({
      filter: collectorFilter,
      time: 60000,
    });

    const selectedValue = confirmation.customId;
    const diceSides = parseInt(selectedValue);

    const rollResult = Math.floor(Math.random() * diceSides) + 1;

    let resultMessage = `You rolled ${rollResult} with the D${diceSides} dice`;

    if (rollResult === diceSides) {
      resultMessage += "\n\nCritical success :partying_face:!";
    } else if (rollResult === 1) {
      resultMessage += "\n\nCritical failure :skull:";
    }

    await confirmation.reply({
      content: resultMessage,
      components: [],
    });
  } catch (e) {
    await interaction.editReply({
      content: "Confirmation not received within 1 minute, cancelling",
      components: [],
    });
  }
}
