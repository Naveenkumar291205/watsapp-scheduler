// ============================================
//   WhatsApp Daily Message Scheduler
//   No API keys needed — uses WhatsApp Web
// ============================================

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

// ─────────────────────────────────────────────
//  CONFIGURATION — Edit this section
// ─────────────────────────────────────────────

const CONFIG = {
  // Send time: "HH:MM" in 24-hour format
  sendTime: '09:00',

  // Days to send (0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat)
  // Example: [1,2,3,4,5] = Monday to Friday
  sendDays: [1, 2, 3, 4, 5, 6, 7],

  // Add a random delay (in seconds) between messages to avoid spam detection
  delayBetweenMessages: 10,

  // Contacts list — add as many as you want
  contacts: [
    { name: 'tholize💜☀️',  phone: '917810083762' }, // India: 91 + number (no +, no spaces)
    { name: 'amma🙈🌍',  phone: '919655938379' },
    // { name: 'Kumar', phone: '917654321098' },  // uncomment to add more
  ],

  // Your daily message — use {name} to personalize
  // You can also use {date}, {day}, {greeting}
  message: `Good morning, {name}! 🌞

Hope you have an amazing day ahead.
Stay positive and keep smiling! 😊`,
};

// ─────────────────────────────────────────────
//  Helper: fill message variables
// ─────────────────────────────────────────────

function buildMessage(template, contact) {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? 'Good morning' :
    hour < 17 ? 'Good afternoon' : 'Good evening';

  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const dayStr = now.toLocaleDateString('en-IN', { weekday: 'long' });

  return template
    .replace(/{name}/g, contact.name)
    .replace(/{date}/g, dateStr)
    .replace(/{day}/g, dayStr)
    .replace(/{greeting}/g, greeting);
}

// ─────────────────────────────────────────────
//  Helper: sleep
// ─────────────────────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─────────────────────────────────────────────
//  Send messages to all contacts
// ─────────────────────────────────────────────

async function sendDailyMessages(client) {
  console.log('\n📨 Sending daily messages...\n');

  for (const contact of CONFIG.contacts) {
    const chatId = `${contact.phone}@c.us`;
    const message = buildMessage(CONFIG.message, contact);

    try {
      await client.sendMessage(chatId, message);
      console.log(`✅  Sent to ${contact.name} (${contact.phone})`);
    } catch (err) {
      console.error(`❌  Failed to send to ${contact.name}: ${err.message}`);
    }

    // Wait between messages
    if (CONFIG.delayBetweenMessages > 0) {
      await sleep(CONFIG.delayBetweenMessages * 1000);
    }
  }

  console.log('\n✅ All messages sent!\n');
}

// ─────────────────────────────────────────────
//  Build cron expression from config
//  Format: "MM HH * * D,D,D"
// ─────────────────────────────────────────────

function buildCronExpression() {
  const [hour, minute] = CONFIG.sendTime.split(':');
  const days = CONFIG.sendDays.join(',');
  return `${minute} ${hour} * * ${days}`;
}

// ─────────────────────────────────────────────
//  WhatsApp client setup
// ─────────────────────────────────────────────

const client = new Client({
  authStrategy: new LocalAuth(), // saves session so you don't re-scan every time
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

// Show QR code in terminal to link WhatsApp
client.on('qr', (qr) => {
  console.log('\n📱 Scan this QR code with WhatsApp on your phone:');
  console.log('   (Open WhatsApp → Settings → Linked Devices → Link a Device)\n');
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log('\n🔐 Authenticated! Session saved — no need to scan QR next time.\n');
});

client.on('ready', () => {
  console.log('✅ WhatsApp connected! Scheduler is running.\n');

  const cronExpr = buildCronExpression();
  console.log(`⏰  Scheduled: every day at ${CONFIG.sendTime}`);
  console.log(`📅  Days: ${CONFIG.sendDays.map(d => ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d]).join(', ')}`);
  console.log(`👥  Contacts: ${CONFIG.contacts.map(c => c.name).join(', ')}`);
  console.log(`\nLeave this terminal open. Press Ctrl+C to stop.\n`);

  // Schedule the daily job
  cron.schedule(cronExpr, () => {
    sendDailyMessages(client);
  });

  // Uncomment the line below to send a test message RIGHT NOW:
  // sendDailyMessages(client);
});

client.on('disconnected', (reason) => {
  console.log('\n⚠️  WhatsApp disconnected:', reason);
  console.log('Restart the script to reconnect.\n');
});

// ─────────────────────────────────────────────
//  Start
// ─────────────────────────────────────────────

console.log('🚀 Starting WhatsApp Scheduler...');
console.log('   This may take 10–20 seconds to load.\n');
client.initialize();
