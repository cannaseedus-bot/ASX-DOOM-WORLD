# ✅ ASX DOOM SERVER - LAUNCH CHECKLIST

**Your step-by-step guide to getting ASX DOOM running**

---

## 🎯 OBJECTIVE

Get ASX DOOM JSON Server running on your machine and create your first game servers.

**Time Required:** 2 minutes  
**Difficulty:** Easy  
**Prerequisites:** Node.js installed  

---

## 📋 PRE-FLIGHT CHECKLIST

### System Requirements

- [ ] Node.js 14+ installed
  ```bash
  node --version  # Should show v14.0.0 or higher
  ```

- [ ] npm installed
  ```bash
  npm --version  # Should show 6.0.0 or higher
  ```

- [ ] Terminal/Command Prompt access

- [ ] Web browser (Chrome, Firefox, Safari, Edge)

### Optional

- [ ] Ollama installed (for AI features)
  ```bash
  ollama --version
  ```

- [ ] Git installed (for version control)
  ```bash
  git --version
  ```

---

## 🚀 LAUNCH SEQUENCE

### Step 1: Navigate to Directory

```bash
cd asx-doom-server
```

**Expected:** You're in the project directory

**Verify:**
```bash
ls
# Should see: package.json, server.js, public/, etc.
```

---

### Step 2: Install Dependencies

```bash
npm install
```

**Expected Output:**
```
added 3 packages in 5s
```

**Verify:**
```bash
ls node_modules/
# Should see: json-server, ws, express
```

**✅ Checkpoint:** Dependencies installed (takes ~5 seconds)

---

### Step 3: Start Server

```bash
npm start
```

**Expected Output:**
```
🚀 ASX DOOM JSON SERVER
================================
🌐 Command Center: http://localhost:3000
🎮 Ready to spawn game servers
💬 WebSocket ready for real-time updates

💡 TIP: Connect Ollama with: ollama serve
```

**✅ Checkpoint:** Server running on port 3000

---

### Step 4: Open Browser

Open your browser and navigate to:
```
http://localhost:3000
```

**Expected:** You should see:
- Green terminal-style interface
- "ASX DOOM SERVER" header
- Status indicators (WebSocket, Ollama, Tokens)
- Server management panel
- Module marketplace

**✅ Checkpoint:** Command Center UI loaded

---

### Step 5: Verify WebSocket Connection

Look at the top-right status bar:
- **WebSocket:** Should say "ONLINE" in green

If offline:
- [ ] Check browser console for errors
- [ ] Try refreshing the page (Ctrl+Shift+R)
- [ ] Restart the server

**✅ Checkpoint:** WebSocket connected

---

### Step 6: Create First JSON Server

1. Click **"➕ CREATE NEW SERVER"** button
2. Watch the terminal log
3. See new server appear in the list

**Expected:**
- New server entry shows: `localhost:3001`
- Status indicator: Green (running)
- Terminal shows: `[INFO] Server created on port 3001`

**✅ Checkpoint:** First server created

---

### Step 7: Verify Server Works

Open new browser tab:
```
http://localhost:3001
```

**Expected:**
- JSON Server default page loads
- Or see JSON-formatted data

**✅ Checkpoint:** Server accessible

---

### Step 8: Create More Servers (Optional)

Click **"CREATE NEW SERVER"** again.

**Expected:**
- Second server: `localhost:3002`
- Third server: `localhost:3003`
- Etc.

**✅ Checkpoint:** Multi-server management working

---

### Step 9: Browse Marketplace

Scroll down to **"Module Marketplace"** panel.

**Expected Modules:**
- 🎮 DOOM Classic Server ($5)
- 🏆 Tournament Manager ($10)
- 🐘 PHP Server Module ($3)
- ⚡ WebSocket Upgrade ($2)
- 💾 Database GUI ($4)

**✅ Checkpoint:** Marketplace loaded

---

### Step 10: Connect Ollama (Optional)

**If you have Ollama installed:**

1. Open new terminal
2. Run: `ollama serve`
3. In Command Center, click **"🔌 CONNECT TO OLLAMA"**

**Expected:**
- Ollama status: "ONLINE" (green)
- Available models listed

**If you don't have Ollama:**
- Skip this step (not required)

**✅ Checkpoint:** Ollama connected (if installed)

---

## 🎉 SUCCESS!

**All systems operational!**

You now have:
- ✅ ASX DOOM Server running
- ✅ Command Center accessible
- ✅ WebSocket connected
- ✅ JSON servers spawned
- ✅ Marketplace available
- ✅ (Optional) Ollama connected

---

## 🧪 SYSTEM TESTS

### Test 1: API Health Check

```bash
curl http://localhost:3000/api/health
```

**Expected:**
```json
{
  "status": "online",
  "servers": [...],
  "ollama": true/false
}
```

---

### Test 2: List Servers

```bash
curl http://localhost:3000/api/servers
```

**Expected:**
```json
{
  "servers": [
    {
      "id": "server-3001",
      "port": 3001,
      "status": "running"
    }
  ]
}
```

---

### Test 3: Create Server via API

```bash
curl -X POST http://localhost:3000/api/servers/create
```

**Expected:**
```json
{
  "success": true,
  "server": {
    "id": "server-3002",
    "port": 3002,
    "url": "http://localhost:3002"
  }
}
```

---

### Test 4: Check Marketplace

```bash
curl http://localhost:3000/api/marketplace/modules
```

**Expected:**
```json
{
  "modules": [
    {
      "id": "doom-classic",
      "name": "DOOM Classic Server",
      "price": 5.00
    }
  ]
}
```

---

## 🐛 TROUBLESHOOTING

### Issue: "Port 3000 already in use"

**Solution 1:** Stop whatever is using port 3000
```bash
# Find process
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Kill process (use PID from above)
kill -9 <PID>
```

**Solution 2:** Change port in `server.js`
```javascript
this.port = 4000;  // Use different port
```

---

### Issue: "npm install" fails

**Solution:**
```bash
# Clear cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules

# Reinstall
npm install
```

---

### Issue: WebSocket won't connect

**Solutions:**
1. Hard refresh browser: `Ctrl+Shift+R`
2. Check browser console for errors
3. Restart server: Stop (Ctrl+C) then `npm start`
4. Try different browser

---

### Issue: Server creation fails

**Check:**
1. Do you have write permissions in the directory?
2. Is port already in use?
3. Check terminal for error messages

**Solution:**
```bash
# Create data directory manually
mkdir data

# Try again
```

---

### Issue: Ollama won't connect

**Solutions:**
1. Make sure Ollama is running: `ollama serve`
2. Check if accessible: `curl http://localhost:11434/api/tags`
3. If using Docker, expose port 11434

---

## 📊 VERIFICATION MATRIX

| Component | Check | Status |
|-----------|-------|--------|
| Node.js | `node --version` | ⬜ |
| npm | `npm --version` | ⬜ |
| Dependencies | `npm install` | ⬜ |
| Server Start | `npm start` | ⬜ |
| UI Access | http://localhost:3000 | ⬜ |
| WebSocket | Green "ONLINE" | ⬜ |
| Create Server | Click button | ⬜ |
| Server Works | http://localhost:3001 | ⬜ |
| API Health | `curl /api/health` | ⬜ |
| Marketplace | Browse modules | ⬜ |

**Target:** All ✅

---

## 🎯 NEXT ACTIONS

Now that you're running, choose your path:

### Path 1: Explore Features
- [ ] Create multiple servers
- [ ] Stop and restart servers
- [ ] Browse marketplace
- [ ] Test API endpoints

### Path 2: Development
- [ ] Read README.md
- [ ] Study server.js code
- [ ] Add custom modules
- [ ] Extend functionality

### Path 3: DOOM Integration
- [ ] Read DOOM_TOURNAMENT_ROADMAP.md
- [ ] Research DOOM engines
- [ ] Plan tournament system
- [ ] Start building

### Path 4: Deploy
- [ ] Set up Cloudflare Tunnel
- [ ] Deploy to VPS
- [ ] Configure domain
- [ ] Share with friends

---

## 📚 DOCUMENTATION QUICK LINKS

- **Quick Start:** [QUICK_START.md](QUICK_START.md)
- **Full Docs:** [README.md](README.md)
- **Roadmap:** [DOOM_TOURNAMENT_ROADMAP.md](DOOM_TOURNAMENT_ROADMAP.md)
- **Comparison:** [THE_RACE.md](THE_RACE.md)
- **Summary:** [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

## 🎮 READY TO BUILD?

**Your ASX DOOM Server is operational!**

Three paths ahead:

1. **🎯 Phase 2:** Build DOOM server module
2. **🏆 Phase 3:** Create tournament system
3. **🚀 Deploy:** Share with the world

**The foundation is solid. The path is clear. Let's make history.** ⚡

---

## 📝 FINAL CHECKLIST

Before you start building:

- [ ] All systems verified (see matrix above)
- [ ] Documentation reviewed
- [ ] API endpoints tested
- [ ] Development plan ready
- [ ] Coffee/energy drink prepared ☕

**LAUNCH SUCCESSFUL! 🚀**

*"One small step for a server, one giant leap for DOOM tournaments."*
