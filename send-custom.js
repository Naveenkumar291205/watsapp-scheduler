// Quick script to send custom message to a contact

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// Configuration
const ammaPhone = '919655938379'; // amma's phone number
const customMessage = 'Enna pandra? 🙈 (What are you doing?)';

const client = new Client({
  authStrategy: new LocalAuth(),
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
  console.log('\n🔐 Authenticated! Session saved.\n');
});

client.on('ready', async () => {
  console.log('✅ WhatsApp connected!\n');
  
  try {
    const chatId = `${ammaPhone}@c.us`;
    await client.sendMessage(chatId, customMessage);
    console.log(`✅ Message sent to amma: "${customMessage}"\n`);
    
    // Close after sending
    setTimeout(() => {
      client.destroy();
      console.log('✅ Done! Connection closed.\n');
      process.exit(0);
    }, 2000);
  } catch (err) {
    console.error(`❌ Failed to send message: ${err.message}\n`);
    client.destroy();
    process.exit(1);
  }
});

client.on('disconnected', (reason) => {
  console.log('\n⚠️  WhatsApp disconnected:', reason);
  process.exit(1);
});

console.log('🚀 Connecting to WhatsApp...\n');
client.initialize();
