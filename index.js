const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const cron = require("node-cron");

const token = process.env.TOKEN;
const reminderId = process.env.REMINDER_CHANNEL_ID;
const guildId = process.env.GUILD_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// Reminder function runs everyday at 09h00 from monday to friday

client.once(Events.ClientReady, async (c) => {
  const channel = await client.channels.fetch(reminderId);
  console.log(`Ready! Logged in as ${c.user.tag}`);
  cron.schedule("0 9 * * 1-5", () => {
    channel.send(
      "@everyone Friendly reminder to sign your presence sheet 😁 !!!!"
    );
  });
});

client.login(token);
