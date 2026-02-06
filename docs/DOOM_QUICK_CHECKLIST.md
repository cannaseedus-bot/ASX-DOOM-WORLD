# ✅ GET DOOM RUNNING - QUICK CHECKLIST

**Follow these steps in order. Takes ~10 minutes.**

---

## 📥 DOWNLOADS FIRST

Do all downloads first, then we'll set up:

### 1. Download Zandronum
- Go to: https://zandronum.com/download
- Click: **Windows 3.1** (latest stable)
- Save to Downloads

### 2. Download FreeDoom (Free DOOM Data)
- Go to: https://github.com/freedoom/freedoom/releases/latest
- Download: `freedoom-0.12.1.zip`
- Save to Downloads

---

## 🔧 SETUP

### Step 1: Stop Current Server

```bash
# Press Ctrl+C in your terminal
```

### Step 2: Create Folders

```bash
cd ~/Downloads/files\ \(8\)/asx-doom-server/asx-doom-server

# Create directories
mkdir -p modules/doom-engine/wads
mkdir -p modules/doom-engine/config
```

### Step 3: Extract Zandronum

1. Open your Downloads folder
2. Find `zandronum-3.1-windows.zip`
3. Right-click → Extract All
4. Copy **everything** from the extracted folder
5. Paste into: `Downloads/files (8)/asx-doom-server/asx-doom-server/modules/doom-engine/`

**You should see:**
- `zandronum.exe`
- `zandronum-server.exe`
- `zandronum.pk3`
- And other files

### Step 4: Add WAD File

1. Open your Downloads folder
2. Find `freedoom-0.12.1.zip`
3. Right-click → Extract All
4. Find `freedoom2.wad` in the extracted folder
5. Copy it to: `Downloads/files (8)/asx-doom-server/asx-doom-server/modules/doom-engine/wads/`
6. **Rename** it to: `DOOM.WAD` (all caps!)

### Step 5: Verify Files

Open Git Bash:

```bash
cd ~/Downloads/files\ \(8\)/asx-doom-server/asx-doom-server

# Check engine
ls modules/doom-engine/zandronum.exe
# Should show the file

# Check WAD
ls modules/doom-engine/wads/DOOM.WAD
# Should show the file
```

If both show files, you're good! ✅

---

## 🚀 START SERVER

### Step 6: Copy Updated Files

**YOU NEED THESE NEW FILES I CREATED:**

Download from here:
- `modules/doom-classic.js` ← [Download this](computer:///mnt/user-data/outputs/asx-doom-server/modules/doom-classic.js)
- Updated `server.js` ← [Download this](computer:///mnt/user-data/outputs/asx-doom-server/server.js)
- Updated `public/index.html` ← [Download this](computer:///mnt/user-data/outputs/asx-doom-server/public/index.html)

**Replace your old files with these new ones!**

### Step 7: Start Server

```bash
npm start
```

Look for:
```
🚀 ASX DOOM JSON SERVER
🎮 DOOM Module loaded
```

### Step 8: Open Browser

```
http://localhost:3000
```

Or if using different port:
```
http://localhost:4000
```

### Step 9: Check DOOM Panel

You should see a new **"🎮 DOOM Classic Server"** panel.

Click **"ℹ️ CHECK STATUS"**

Should show:
```
✅ DOOM Engine Installed
Version: 1.0.0
Active Servers: 0
```

### Step 10: Start DOOM Server

Click **"🚀 QUICK START DOOM SERVER"**

Watch the terminal log. You should see:
```
🎮 Starting DOOM server on port 10666...
```

---

## 🎮 TEST IT

### Connect to Your Server

1. Go to: `modules/doom-engine/`
2. Double-click `zandronum.exe` (NOT the server one)
3. Click **"Multiplayer"**
4. Click **"Join Game"**
5. In the address bar, type: `localhost:10666`
6. Click **"Join"**

**YOU'RE IN DOOM!** 🎮🔥

---

## ✅ CHECKLIST

- [ ] Downloaded Zandronum
- [ ] Downloaded FreeDoom
- [ ] Created `modules/doom-engine/` folder
- [ ] Extracted Zandronum to `modules/doom-engine/`
- [ ] Copied `freedoom2.wad` to `modules/doom-engine/wads/`
- [ ] Renamed to `DOOM.WAD`
- [ ] Downloaded new `doom-classic.js` file
- [ ] Downloaded updated `server.js`
- [ ] Downloaded updated `index.html`
- [ ] Replaced old files with new ones
- [ ] Ran `npm start`
- [ ] Opened `http://localhost:3000`
- [ ] Saw DOOM panel
- [ ] Clicked "CHECK STATUS" → Shows installed ✅
- [ ] Clicked "QUICK START" → Server starts
- [ ] Opened Zandronum client
- [ ] Connected to `localhost:10666`
- [ ] **PLAYING DOOM!** 🎮

---

## 🐛 COMMON ISSUES

### "DOOM Engine Not Installed"

**Fix:**
```bash
# Make sure zandronum.exe exists:
ls modules/doom-engine/zandronum.exe
```

If it doesn't exist, re-extract Zandronum.

### "Cannot find DOOM.WAD"

**Fix:**
```bash
# Check the WAD file:
ls modules/doom-engine/wads/DOOM.WAD
```

Make sure it's:
- Exactly named `DOOM.WAD` (all caps)
- In the `wads` folder
- Not named `freedoom2.wad`

### "Module not found" error

**Fix:** You need the new files I created:
- `modules/doom-classic.js`
- Updated `server.js`
- Updated `public/index.html`

Download them from the links above!

### Port 10666 already in use

**Fix:** Kill any existing Zandronum server:
1. Task Manager (Ctrl+Shift+Esc)
2. Find "zandronum-server.exe"
3. End Task

---

## 🎯 NEXT STEPS

Once DOOM is running:

1. **Test Multiplayer**
   - Start 2+ Zandronum clients
   - All connect to `localhost:10666`
   - Deathmatch!

2. **Try Different Maps**
   ```bash
   curl -X POST http://localhost:3000/api/doom/server/create \
     -H "Content-Type: application/json" \
     -d '{"map": "E1M2", "port": 10667}'
   ```

3. **Build Tournament System**
   - Now that DOOM works...
   - Build brackets
   - Track scores
   - Automate matches

---

## 🚀 YOU'RE READY!

Once that checklist is complete, you have:
- ✅ DOOM engine installed
- ✅ Server running locally
- ✅ Can play multiplayer
- ✅ API controls servers
- ✅ Ready for tournaments!

**LET'S GO!** 🎮⚡
