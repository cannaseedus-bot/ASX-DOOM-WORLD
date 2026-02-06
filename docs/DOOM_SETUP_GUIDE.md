# 🎮 DOOM MODULE - SETUP GUIDE (Windows)

**Get DOOM running locally for testing!**

---

## 🎯 GOAL

Run a local DOOM deathmatch server where you can:
- Host multiplayer games
- Play with friends on LAN
- Test tournament features
- Customize maps and settings

---

## 📋 WHAT YOU NEED

### 1. Zandronum (DOOM Engine)

**Download:** https://zandronum.com/download

**Windows Version:**
- Download: `zandronum3.1-windows.zip`
- Size: ~15 MB

### 2. DOOM.WAD (Game Data)

**Option A: Use FreeDoom (Free & Legal)**
- Download: https://freedoom.github.io/download.html
- Get: `freedoom-0.12.1.zip`
- Use: `freedoom2.wad` (acts like DOOM2.WAD)

**Option B: Buy DOOM (Official)**
- Steam: https://store.steampowered.com/app/2280/DOOM/
- GOG: https://www.gog.com/game/doom_ii
- After purchase, extract DOOM.WAD or DOOM2.WAD

---

## 🚀 STEP-BY-STEP SETUP

### Step 1: Stop Your Current Server

```bash
# In your terminal, press Ctrl+C to stop the ASX server
```

### Step 2: Download Zandronum

1. Go to: https://zandronum.com/download
2. Download: **Windows 3.1** (latest stable)
3. Extract the ZIP file

### Step 3: Set Up DOOM Engine

```bash
# Create the doom engine directory
cd ~/Downloads/files\ \(8\)/asx-doom-server/asx-doom-server
mkdir -p modules/doom-engine/wads

# Copy Zandronum files
# Drag and drop the extracted Zandronum folder contents into:
# modules/doom-engine/
```

**You should have:**
```
modules/
└── doom-engine/
    ├── zandronum.exe
    ├── zandronum-server.exe
    ├── zandronum.pk3
    ├── skulltag_actors.pk3
    ├── (other files)
    └── wads/
        └── (put WAD files here)
```

### Step 4: Get Game Data (WAD File)

**Choose Option A or B:**

#### Option A: FreeDoom (Free)

1. Download: https://github.com/freedoom/freedoom/releases/download/v0.12.1/freedoom-0.12.1.zip
2. Extract `freedoom-0.12.1.zip`
3. Copy `freedoom2.wad` to: `modules/doom-engine/wads/`
4. Rename it to: `DOOM.WAD` (uppercase)

```bash
# In Git Bash:
cp ~/Downloads/freedoom-0.12.1/freedoom2.wad modules/doom-engine/wads/DOOM.WAD
```

#### Option B: Official DOOM

1. Buy DOOM on Steam/GOG
2. Find DOOM2.WAD in the installation folder:
   - Steam: `C:\Program Files (x86)\Steam\steamapps\common\Doom 2\base\DOOM2.WAD`
   - GOG: `C:\GOG Games\DOOM II\DOOM2.WAD`
3. Copy to: `modules/doom-engine/wads/DOOM.WAD`

```bash
# Example from Steam:
cp "/c/Program Files (x86)/Steam/steamapps/common/Doom 2/base/DOOM2.WAD" modules/doom-engine/wads/DOOM.WAD
```

### Step 5: Verify Setup

```bash
# Check if everything is in place
ls modules/doom-engine/
# Should see: zandronum.exe, zandronum-server.exe, etc.

ls modules/doom-engine/wads/
# Should see: DOOM.WAD
```

### Step 6: Copy New Files

You need to add the new DOOM module to your project:

```bash
# The doom-classic.js file needs to be in your modules folder
# Check if it exists:
ls modules/
# Should see: doom-classic.js

# If not, create the modules directory:
mkdir -p modules
```

**I'll give you the updated files in a moment!**

### Step 7: Restart Server

```bash
npm start
```

You should see:
```
🚀 ASX DOOM JSON SERVER
================================
🌐 Command Center: http://localhost:3000
🎮 Ready to spawn game servers
💬 WebSocket ready for real-time updates
🎮 DOOM Module loaded
```

---

## 🧪 TEST THE DOOM SERVER

### Via Browser (Command Center)

1. Open: http://localhost:3000
2. Look for new "DOOM Servers" panel
3. Click "🎮 START DOOM SERVER"
4. Server starts on port 10666

### Via API

```bash
# Check DOOM module status
curl http://localhost:3000/api/doom/status

# Create a DOOM server
curl -X POST http://localhost:3000/api/doom/server/quickstart

# List DOOM servers
curl http://localhost:3000/api/doom/servers
```

---

## 🎮 CONNECT TO YOUR DOOM SERVER

### Option 1: Zandronum Client

1. Run `zandronum.exe` (the non-server version)
2. Click "Multiplayer"
3. Click "Join Game"
4. Enter: `localhost:10666`
5. Click "Join"

### Option 2: Command Line

```bash
# In the doom-engine folder:
./zandronum.exe -connect localhost:10666
```

### Option 3: Doomseeker (Server Browser)

1. Download: https://doomseeker.drdteam.org/
2. Install and run
3. Search for your server
4. Double-click to join

---

## ⚙️ CONFIGURATION

### Server Settings

When creating via API:

```bash
curl -X POST http://localhost:3000/api/doom/server/create \
  -H "Content-Type: application/json" \
  -d '{
    "hostname": "My DOOM Server",
    "port": 10666,
    "maxPlayers": 8,
    "map": "E1M1",
    "difficulty": 3,
    "fraglimit": 25,
    "timelimit": 10,
    "deathmatch": true
  }'
```

### Map Names

**DOOM 1 (E#M#):**
- E1M1 - Hangar
- E1M2 - Nuclear Plant
- E1M3 - Toxin Refinery
- ... through E3M9

**DOOM 2 (MAP##):**
- MAP01 - Entryway
- MAP02 - Underhalls
- MAP03 - The Gantlet
- ... through MAP32

### Difficulty Levels

- 1 = I'm Too Young To Die (Easy)
- 2 = Hey, Not Too Rough (Normal)
- 3 = Hurt Me Plenty (Hard)
- 4 = Ultra-Violence (Very Hard)
- 5 = Nightmare (Insane)

---

## 🐛 TROUBLESHOOTING

### "DOOM engine not installed"

**Check:**
```bash
ls modules/doom-engine/zandronum.exe
# Should exist
```

**Fix:** Re-download Zandronum and place in `modules/doom-engine/`

---

### "Cannot find DOOM.WAD"

**Check:**
```bash
ls modules/doom-engine/wads/DOOM.WAD
# Should exist
```

**Fix:** 
- Make sure WAD file is named exactly `DOOM.WAD` (uppercase)
- Must be in `modules/doom-engine/wads/` folder

---

### "Port 10666 already in use"

**Fix:**
```bash
# Specify different port
curl -X POST http://localhost:3000/api/doom/server/create \
  -H "Content-Type: application/json" \
  -d '{"port": 10667}'
```

---

### "Server starts but can't connect"

**Check Windows Firewall:**
1. Windows Security → Firewall
2. Allow Zandronum through firewall
3. Allow port 10666 (UDP)

**Or temporarily disable firewall for testing**

---

### "Module not found" error

**Fix:**
```bash
# Make sure doom-classic.js is in modules/
ls modules/doom-classic.js

# If not there, you need the updated files
```

---

## 📁 DIRECTORY STRUCTURE

After setup, you should have:

```
asx-doom-server/
├── server.js (updated)
├── modules/
│   ├── doom-classic.js (NEW)
│   └── doom-engine/
│       ├── zandronum.exe
│       ├── zandronum-server.exe
│       ├── zandronum.pk3
│       ├── skulltag_actors.pk3
│       ├── wads/
│       │   └── DOOM.WAD
│       └── config/ (auto-created)
└── (other files)
```

---

## 🎯 NEXT STEPS

Once you have a DOOM server running:

### 1. Test Locally
- Start server
- Connect with Zandronum client
- Play a few rounds

### 2. Test with Friends (LAN)
- Find your local IP: `ipconfig`
- Share IP with friends on same network
- They connect: `zandronum.exe -connect YOUR_IP:10666`

### 3. Test Multiplayer Features
- Multiple players
- Frag limits
- Time limits
- Different maps

### 4. Build Tournament System
- Bracket management
- Score tracking
- Match scheduling

---

## 🚀 QUICK COMMAND REFERENCE

```bash
# Check DOOM status
curl http://localhost:3000/api/doom/status

# Quick start server (defaults)
curl -X POST http://localhost:3000/api/doom/server/quickstart

# Create custom server
curl -X POST http://localhost:3000/api/doom/server/create \
  -H "Content-Type: application/json" \
  -d '{"hostname": "Test Server", "map": "E1M1"}'

# List servers
curl http://localhost:3000/api/doom/servers

# Stop server
curl -X POST http://localhost:3000/api/doom/server/doom-10666/stop
```

---

## ✅ SUCCESS CHECKLIST

- [ ] Zandronum downloaded
- [ ] Zandronum extracted to `modules/doom-engine/`
- [ ] DOOM.WAD in `modules/doom-engine/wads/`
- [ ] doom-classic.js in `modules/` folder
- [ ] server.js updated with DOOM routes
- [ ] Server restarted (`npm start`)
- [ ] DOOM module shows as "installed"
- [ ] Can create DOOM server via API
- [ ] Can connect with Zandronum client
- [ ] Multiplayer works

---

## 🎮 YOU'RE READY!

Once all checks pass, you have:
- ✅ DOOM engine running
- ✅ Server management via API
- ✅ Local multiplayer working
- ✅ Foundation for tournaments

**Next: Build the tournament bracket system!** 🏆

---

**Need help?** Check each step carefully. Most issues are:
1. Wrong file paths
2. Missing WAD file
3. Firewall blocking
4. Port already in use

**Questions?** Let me know which step you're stuck on!
