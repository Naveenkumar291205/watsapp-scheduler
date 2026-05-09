# WhatsApp Daily Message Scheduler
### No API keys needed — works with your existing WhatsApp account

---

## How it works
This app uses **WhatsApp Web** (the same thing as web.whatsapp.com) to send messages automatically from your account. You scan a QR code once, and it remembers your session.

---

## Setup (one-time)

### Step 1 — Install Node.js
Download from: https://nodejs.org  
Choose the **LTS** version.

### Step 2 — Install dependencies
Open a terminal in this folder and run:
```
npm install
```

### Step 3 — Edit your contacts & message
Open `scheduler.js` and edit the `CONFIG` section at the top:

```js
contacts: [
  { name: 'Priya',  phone: '919876543210' },  // India: 91 + 10-digit number
  { name: 'Rajan',  phone: '918765432109' },
],

message: `Good morning, {name}! 🌞 Hope you have an amazing day!`,

sendTime: '09:00',   // 24-hour format
sendDays: [1,2,3,4,5,6,0],  // 0=Sun, 1=Mon ... 6=Sat
```

### Step 4 — Run the app
```
node scheduler.js
```

### Step 5 — Scan the QR code
- A QR code will appear in the terminal
- Open WhatsApp on your phone
- Go to **Settings → Linked Devices → Link a Device**
- Scan the QR code
- Done! Your session is saved. Next time you run it, no QR needed.

---

## Phone number format
Remove all spaces, dashes, and the leading `+`.

| Country | Example number | Format to use |
|---------|---------------|---------------|
| India   | +91 98765 43210 | `919876543210` |
| USA     | +1 415 555 0100 | `14155550100`  |
| UK      | +44 7911 123456 | `447911123456` |

---

## Message variables
Use these in your message template:

| Variable    | Replaced with                    |
|-------------|----------------------------------|
| `{name}`    | Contact's name                   |
| `{date}`    | Full date (e.g. Monday, 9 May 2026) |
| `{day}`     | Day name (e.g. Monday)           |
| `{greeting}`| Good morning / afternoon / evening |

---

## Send a test message right now
Open `scheduler.js`, find this line near the bottom, and remove the `//`:
```js
// sendDailyMessages(client);
```
Save and run `node scheduler.js` — it will send immediately after connecting.

---

## Keep it running 24/7
To run in the background even after closing the terminal:

**Option 1 — pm2 (recommended):**
```
npm install -g pm2
pm2 start scheduler.js --name whatsapp-bot
pm2 save
pm2 startup
```

**Option 2 — Run on a cheap cloud server:**
Upload this folder to any VPS (DigitalOcean, Railway, Render) and run with pm2.

---

## Important notes
- Keep your phone connected to the internet (WhatsApp Web requires the phone to be online)
- Don't send to too many people too fast — use the `delayBetweenMessages` setting
- This uses WhatsApp Web automation — use responsibly and don't spam
