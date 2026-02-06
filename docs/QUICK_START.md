# ⚡ ASX DOOM SERVER - QUICK START

Get up and running in 60 seconds!

---

## 📋 PREREQUISITES

- Node.js 14+ installed
- Terminal/Command Prompt
- Web browser

**Optional:**
- Ollama (for AI features)

---

## 🚀 INSTALLATION

### Step 1: Install Dependencies

```bash
cd asx-doom-server
npm install
```

**Wait time:** ~5 seconds (only 3 dependencies!)

---

### Step 2: Start Server

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

💡 TIP: Connect Ollama with: ollama serve
```

---

### Step 3: Open Browser

```
http://localhost:3000
```

You'll see the **ASX DOOM Command Center** with:
- ✅ Green terminal interface
- ✅ Server management panel
- ✅ Ollama integration
- ✅ Module marketplace
- ✅ Real-time updates

---

## 🎮 FIRST ACTIONS

### Create Your First JSON Server

1. Click **"➕ CREATE NEW SERVER"**
2. Watch the terminal log
3. See your new server at `localhost:3001`

### Connect Ollama (Optional)

1. In another terminal: `ollama serve`
2. In Command Center: Click **"🔌 CONNECT TO OLLAMA"**
3. See your available models

### Browse Marketplace

Scroll down to see available modules:
- 🎮 DOOM Classic Server
- 🏆 Tournament Manager
- 🐘 PHP Server Module
- And more...

---

## 🧪 TEST THE API

### Create a Server via API

```bash
curl -X POST http://localhost:3000/api/servers/create
```

### List All Servers

```bash
curl http://localhost:3000/api/servers
```

### Check Health

```bash
curl http://localhost:3000/api/health
```

---

## 🛑 STOPPING THE SERVER

Press `Ctrl+C` in the terminal

---

## 🔄 DEVELOPMENT MODE

Auto-restart on file changes:

```bash
npm run dev
```

Uses `nodemon` to watch for changes.

---

## 🌐 EXPOSE TO INTERNET

### Using Cloudflare Tunnel

```bash
# Terminal 1: Start server
npm start

# Terminal 2: Create tunnel
cloudflared tunnel --url http://localhost:3000
```

You'll get a public URL like:
```
https://random-name.trycloudflare.com
```

Share this URL to let anyone access your server!

---

## 📱 RUN ON MOBILE (Termux)

```bash
# Install Node.js
pkg install nodejs

# Navigate to project
cd asx-doom-server

# Install & run
npm install
npm start
```

Now your phone is a game server! 📱🎮

---

## ⚙️ CONFIGURATION

### Change Port

Edit `server.js`:

```javascript
this.port = 3000; // Change to 4000, 5000, etc.
```

### Add Custom Modules

Edit the `marketplace` section in `server.js`

---

## ❓ COMMON ISSUES

### "Port already in use"

Something else is using port 3000. Either:
- Stop that process
- Change the port in `server.js`

```bash
# Find what's using port 3000
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows
```

### "npm install" fails

```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules
npm install
```

### WebSocket won't connect

- Hard refresh: `Ctrl+Shift+R`
- Check browser console for errors
- Ensure server is running

---

## 🎯 WHAT'S NEXT?

1. **Explore the API** - Check README.md
2. **Install modules** - Browse marketplace
3. **Connect Ollama** - Enable AI features
4. **Create DOOM server** - Install DOOM module
5. **Host tournaments** - Coming soon!

---

## 📚 MORE INFO

- **Full Docs:** [README.md](README.md)
- **API Reference:** See README.md
- **Troubleshooting:** README.md FAQ section

---

## 🔥 YOU'RE READY!

Your ASX DOOM JSON Server is now running!

**Command Center:** http://localhost:3000

Have fun building the future of decentralized gaming! 🚀🎮
