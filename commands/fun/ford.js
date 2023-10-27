import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ford")
  .setDescription("bord bocus");

export async function execute(interaction) {
  await interaction.reply("focus");
}
