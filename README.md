# WhatsApp Message Scheduler

> Automate scheduled WhatsApp messages using WhatsApp Web — no WhatsApp API key required.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![WhatsApp Web.js](https://img.shields.io/badge/whatsapp--web.js-Automation-25D366?logo=whatsapp)](https://github.com/pedroslopez/whatsapp-web.js)
[![Cron](https://img.shields.io/badge/node--cron-Scheduler-blue)](https://www.npmjs.com/package/node-cron)
[![License](https://img.shields.io/badge/License-ISC-lightgrey)](https://opensource.org/licenses/ISC)

## 📌 Overview

**WhatsApp Message Scheduler** is a lightweight Node.js automation project that sends WhatsApp messages automatically at configured times and days.

The application connects to your WhatsApp account through **WhatsApp Web**, authenticates using a QR code, saves the session locally, and then uses a cron-based scheduler to deliver messages to configured contacts.

It is designed for personal automation, reminders, greetings, and other legitimate messaging workflows.

---

## ✨ Features

### ⏰ Scheduled Messaging
Configure a specific time using 24-hour format.

```js
sendTime: '09:00'
```

Messages are triggered automatically using `node-cron`.

### 📅 Day-Based Scheduling
Choose the days on which messages should be sent.

```js
sendDays: [1, 2, 3, 4, 5, 6, 0]
```

Day mapping:

| Value | Day |
|---:|---|
| `0` | Sunday |
| `1` | Monday |
| `2` | Tuesday |
| `3` | Wednesday |
| `4` | Thursday |
| `5` | Friday |
| `6` | Saturday |

### 👥 Multiple Contacts
Add multiple contacts to the scheduler.

```js
contacts: [
  { name: 'Priya', phone: '919876543210' },
  { name: 'Rajan', phone: '918765432109' }
]
```

### 💬 Personalized Messages
Message templates support dynamic variables.

```text
Good morning, {name}!
Have a great {day}! 🌞
```

Supported variables:

| Variable | Purpose |
|---|---|
| `{name}` | Contact name |
| `{date}` | Full current date |
| `{day}` | Current weekday |
| `{greeting}` | Morning, afternoon, or evening greeting |

### 📱 QR Code Authentication
The application generates a terminal QR code for linking the WhatsApp account.

Once authenticated, `LocalAuth` stores the session so the QR code does not need to be scanned every time.

### 🔐 Local Session Storage
Authentication is handled with:

```js
authStrategy: new LocalAuth()
```

The local WhatsApp Web session is ignored by Git through `.gitignore`.

### ⏳ Delay Between Messages
A delay can be configured between contacts:

```js
delayBetweenMessages: 10
```

This helps avoid sending messages to all contacts simultaneously.

### 📨 Custom One-Time Message
`send-custom.js` provides a separate script for sending a custom message immediately to a configured WhatsApp contact.

### 🪟 Windows Startup Script
The repository includes:

```text
start-scheduler.bat
```

for launching the scheduler on Windows.

---

## 🧠 How It Works

```text
Start Application
       │
       ▼
Initialize WhatsApp Web Client
       │
       ▼
QR Code Displayed
       │
       ▼
Scan QR Using WhatsApp
       │
       ▼
Session Authenticated & Saved
       │
       ▼
WhatsApp Client Ready
       │
       ▼
Create Cron Schedule
       │
       ▼
Scheduled Time Reached
       │
       ▼
Build Personalized Message
       │
       ▼
Send to Configured Contacts
       │
       ▼
Wait Between Messages
       │
       ▼
Continue Scheduler
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **JavaScript** | Application logic |
| **whatsapp-web.js** | WhatsApp Web automation |
| **node-cron** | Message scheduling |
| **qrcode-terminal** | QR authentication in terminal |
| **LocalAuth** | Persistent WhatsApp session |
| **fs / path** | Node.js filesystem utilities |

---

## 📂 Project Structure

```text
watsapp-scheduler/
│
├── scheduler.js
├── send-custom.js
├── start-scheduler.bat
├── package.json
├── .gitignore
└── README.md
```

### File Description

| File | Description |
|---|---|
| `scheduler.js` | Main scheduled messaging application |
| `send-custom.js` | Sends a custom one-time message |
| `start-scheduler.bat` | Windows launcher script |
| `package.json` | Project metadata and dependencies |
| `.gitignore` | Ignores Node modules and WhatsApp session/cache data |
| `README.md` | Project documentation |

---

## ⚙️ Installation

### 1. Install Node.js

Download and install the LTS version of Node.js:

```text
https://nodejs.org/
```

Verify the installation:

```bash
node --version
npm --version
```

### 2. Clone the Repository

```bash
git clone https://github.com/Naveenkumar291205/watsapp-scheduler.git
```

### 3. Enter the Project

```bash
cd watsapp-scheduler
```

### 4. Install Dependencies

```bash
npm install
```

This installs:

```text
whatsapp-web.js
node-cron
qrcode-terminal
```

---

## 🔧 Configuration

Open:

```text
scheduler.js
```

Edit the `CONFIG` section.

### Schedule

```js
sendTime: '09:00',
sendDays: [1, 2, 3, 4, 5, 6, 0],
```

### Contacts

```js
contacts: [
  { name: 'Priya', phone: '919876543210' },
  { name: 'Rajan', phone: '918765432109' }
],
```

### Message

```js
message: `Good morning, {name}! 🌞

Hope you have an amazing day ahead.
Stay positive and keep smiling! 😊`,
```

### Delay

```js
delayBetweenMessages: 10,
```

---

## 📞 Phone Number Format

Use the international country code without:

- `+`
- Spaces
- Hyphens

Examples:

| Country | Original | Format |
|---|---|---|
| India | `+91 98765 43210` | `919876543210` |
| USA | `+1 415 555 0100` | `14155550100` |
| UK | `+44 7911 123456` | `447911123456` |

---

## ▶️ Run the Scheduler

Start the main scheduler:

```bash
node scheduler.js
```

You will see a QR code in the terminal.

Open WhatsApp on your phone:

```text
WhatsApp
   ↓
Settings
   ↓
Linked Devices
   ↓
Link a Device
   ↓
Scan QR Code
```

After authentication, the application displays the configured schedule and keeps running.

Leave the terminal open while the scheduler is active.

---

## 🧪 Send a Test Message

The main scheduler contains a commented test call:

```js
// sendDailyMessages(client);
```

Uncomment it temporarily:

```js
sendDailyMessages(client);
```

Then run:

```bash
node scheduler.js
```

The message will be sent after the WhatsApp client becomes ready.

---

## 💬 Send a Custom Message

The repository also contains:

```text
send-custom.js
```

This script connects to WhatsApp, sends the configured custom message, and then closes the connection.

Run:

```bash
node send-custom.js
```

Update the contact and message inside the script before using it.

---

## 🪟 Windows Launch

The project includes:

```text
start-scheduler.bat
```

You can run the batch file directly on Windows.

The current script expects the project at:

```text
d:\TOTAL MINI  PROJECTS\whatsapp-scheduler
```

For portability, change that path to the actual location of your cloned repository.

---

## 🔄 Message Processing

For every configured contact, the scheduler:

1. Creates the WhatsApp chat ID.
2. Builds the personalized message.
3. Sends the message.
4. Logs the result.
5. Waits for the configured delay.
6. Continues to the next contact.

Example chat ID:

```text
919876543210@c.us
```

---

## 🧩 Message Template System

The project dynamically replaces template variables.

Example:

```js
message: `Hello {name}!

Today is {day}.
{greeting}, and have a great day!`
```

The generated message changes automatically according to the contact and current date/time.

---

## 🛡️ Error Handling

The scheduler handles message-level failures with `try/catch`.

Example:

```text
✅ Sent to Contact
❌ Failed to send to Contact
```

It also handles WhatsApp disconnection events and reports the reason in the terminal.

---

## 🔐 Security & Privacy

The repository correctly ignores WhatsApp Web authentication/cache directories:

```gitignore
node_modules/
.wwebjs_auth/
.wwebjs_cache/
```

Do not commit generated WhatsApp session data or other private account information.

The project also contains real-looking contact numbers in source files. For a public GitHub repository, replace personal numbers with placeholders before sharing the project publicly.

---

## ⚠️ Important Usage Notes

This project automates an existing WhatsApp Web session. It is not an official WhatsApp Business API integration.

Use it only for legitimate, consent-based communication and avoid unsolicited or high-volume messaging.

Keep the scheduler machine running while scheduled messages need to be sent.

---

## 🚀 Running Continuously

For a long-running Node.js process, a process manager such as PM2 can be used:

```bash
npm install -g pm2
```

Start:

```bash
pm2 start scheduler.js --name whatsapp-scheduler
```

Save the process:

```bash
pm2 save
```

The exact always-on setup depends on the operating system and hosting environment.

---

## 📈 Future Improvements

Potential upgrades for the project:

- Web-based scheduling dashboard
- Add/edit/delete contacts from UI
- Multiple scheduled messages
- Message history and delivery logs
- Pause/resume scheduler
- Retry failed messages
- Persistent message database
- Timezone support
- Configurable recurring schedules
- CSV contact import
- Template management
- Desktop notification system
- Docker support
- Production logging and monitoring
- Automated tests
- Environment-based configuration

---

## 💡 Learning Outcomes

This project demonstrates practical usage of:

- Node.js application development
- JavaScript asynchronous programming
- Event-driven architecture
- WhatsApp Web automation
- QR-based authentication
- Cron scheduling
- Promise-based delays
- Dynamic message templating
- Error handling
- CLI application interaction
- Persistent session management

---

## 📊 Project Highlights

| Area | Implementation |
|---|---|
| Runtime | Node.js |
| Automation | WhatsApp Web |
| Scheduling | `node-cron` |
| Authentication | QR Code + `LocalAuth` |
| Messages | Personalized templates |
| Contacts | Multiple configured contacts |
| Delay | Configurable |
| Platform | Primarily Windows / Node.js |
| Interface | Terminal / CLI |

---

## 👨‍💻 Author

**Naveen Kumar M**

GitHub:  
https://github.com/Naveenkumar291205

---

## ⭐ Project Goal

The goal of this project is to build a simple automation tool that combines **WhatsApp Web, Node.js, scheduling, and personalized message generation** into one lightweight application.

---

## 📄 License

This project currently uses the **ISC** license configuration defined in `package.json`.
