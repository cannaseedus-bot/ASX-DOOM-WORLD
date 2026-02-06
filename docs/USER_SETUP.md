# 🎮 ASX DOOM SERVER - USER SETUP

**Get your DOOM tournament server running in 5 minutes!**

---

## 📥 DOWNLOAD

### 1. Get the ASX DOOM Server

Download from: **[GitHub Releases](#)** (link when published)

**What you get:**
- `asx-doom-server.exe` - The main server
- `config.json` - Configuration file
- `README.md` - This file

---

## 📁 FOLDER STRUCTURE

Create this simple structure:

```
ASX-DOOM/
├── asx-doom-server.exe    ← Run this!
├── config.json            ← Configuration
├── games/
│   └── zandronum/         ← Extract Zandronum here
│       ├── zandronum.exe
│       ├── zandronum-server.exe
│       └── wads/
│           └── DOOM.WAD   ← Put your DOOM.WAD here
└── data/                  ← Auto-created
```

---

## 🚀 QUICK SETUP

### Step 1: Create Folders

```
1. Create a folder called "ASX-DOOM"
2. Put asx-doom-server.exe in it
3. Create folder: games/zandronum/wads/
```

### Step 2: Get Zandronum

1. Download from: https://zandronum.com/download
2. Get **Windows 3.1** version
3. Extract **everything** to: `games/zandronum/`

### Step 3: Get DOOM.WAD

**Option A: FreeDoom (Free)**
1. Download: https://freedoom.github.io/download.html
2. Get `freedoom2.wad`
3. Rename to `DOOM.WAD`
4. Put in: `games/zandronum/wads/`

**Option B: Buy DOOM**
1. Buy on Steam/GOG
2. Find DOOM2.WAD
3. Copy to: `games/zandronum/wads/DOOM.WAD`

### Step 4: Run Server

```
Double-click: asx-doom-server.exe
```

A window will open showing:
```
🚀 ASX DOOM JSON SERVER
================================
🌐 Command Center: http://localhost:3000
🎮 DOOM Module loaded
✅ Ready!
```

### Step 5: Open Browser

Open: **http://localhost:3000**

You'll see the command center!

---

## 🎮 CREATE DOOM SERVER

### Via Web Interface

1. Click **"🚀 QUICK START DOOM SERVER"**
2. Server starts on port 10666
3. Connect with Zandronum client

### Via Command Line

Open another terminal:

```bash
# Create server
curl -X POST http://localhost:3000/api/doom/server/quickstart

# List servers
curl http://localhost:3000/api/doom/servers
```

---

## 🎯 CONNECT & PLAY

1. Run `zandronum.exe` (in games/zandronum/)
2. Multiplayer → Join Game
3. Enter: `localhost:10666`
4. **FRAG!** 🎮

---

## ⚙️ CONFIGURATION

Edit `config.json` to customize:

### Token Settings

```json
"token": {
  "name": "ASX",
  "enabled": true,
  "pricing": {
    "doom_server": 5.00,
    "tournament_entry": 10.00
  }
}
```

### Server Settings

```json
"server": {
  "port": 3000,
  "max_doom_servers": 10
}
```

---

## 💰 ASX TOKEN

This server uses **ASX tokens** for:
- Creating DOOM servers (5 ASX)
- Tournament entries (10 ASX)
- Premium features (20 ASX)

**Get ASX tokens:**
- Link your wallet in the UI
- Buy from marketplace
- Earn by hosting tournaments

---

## 🐛 TROUBLESHOOTING

### "Can't find Zandronum"

**Fix:**
```
Make sure you have:
games/zandronum/zandronum-server.exe
```

### "Can't find DOOM.WAD"

**Fix:**
```
Make sure you have:
games/zandronum/wads/DOOM.WAD
```

Must be named exactly `DOOM.WAD` (uppercase)

### "Port 3000 in use"

**Fix:** Edit `config.json`:
```json
"server": {
  "port": 4000
}
```

Then open: http://localhost:4000

---

## 🎓 LEARN MORE

- **Tournaments:** https://docs.asx-gaming.com/tournaments
- **Token Info:** https://docs.asx-gaming.com/token
- **API Docs:** https://docs.asx-gaming.com/api
- **Discord:** https://discord.gg/asx-gaming

---

## 💎 UPGRADE OPTIONS

### Want Your Own Token?

Buy the **Source Code** for $500 and:
- Use YOUR token instead of ASX
- Remove ASX branding
- Customize everything
- Commercial license

**Purchase:** https://asx-gaming.com/purchase

### Need Custom Features?

Get the **Enterprise Package** for $10,000:
- Custom development
- Deployment assistance
- 1 year support
- Priority features

**Contact:** sales@asx-gaming.com

---

## ✅ YOU'RE READY!

Once setup is complete:
- ✅ Server running on localhost:3000
- ✅ DOOM servers manageable via UI
- ✅ Tournaments ready to go
- ✅ ASX token integrated

**BUILD YOUR GAMING EMPIRE!** 🚀🎮💰
