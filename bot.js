import ENV from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";

ENV.config();
const BOT_TOKEN = process.env.TOKEN;

if (!BOT_TOKEN) {
  console.error(
    "Bot token is missing. Make sure to set TOKEN in your .env file."
  );
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "!ping") {
    message.reply("Pong!");
  }
});

client.login(BOT_TOKEN).catch((error) => {
  console.error(`Error logging in: ${error.message}`);
});
