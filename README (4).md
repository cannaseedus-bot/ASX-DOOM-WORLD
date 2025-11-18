# 🎮 ASX DOOM JSON SERVER

**Multi-server JSON management with Ollama integration, marketplace, and tournament support**

---

## 🎯 WHAT IS THIS?

ASX DOOM JSON Server is a **pure** JSON Server-based platform that:

✅ **NO React** - Pure HTML/CSS/JavaScript  
✅ **NO Vite** - No build step required  
✅ **NO unnecessary Node modules** - Just 3 dependencies  
✅ Uses ASX JSON, VDOM, and AJAX only  
✅ Spawn multiple JSON servers (localhost:3000, 3001, 3002...)  
✅ Connect Ollama for local AI  
✅ Module marketplace with ASX token economy  
✅ Perfect for DOOM tournaments and gaming servers  

---

## 🚀 QUICK START

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# 3. Open browser
http://localhost:3000
```

That's it! No build step, no compilation, no bloat.

---

## 📦 DEPENDENCIES

```json
{
  "json-server": "^0.17.4",  // JSON Server core
  "ws": "^8.14.2",           // WebSocket support
  "express": "^4.18.2"       // HTTP server
}
```

**Total: 3 dependencies**  
Compare to React + Vite: 50+ dependencies

---

## 🏗️ ARCHITECTURE

```
ASX DOOM Server (Port 3000)
├── Command Center (Web UI)
├── WebSocket (Real-time updates)
├── API Routes
│   ├── /api/servers        - Manage JSON servers
│   ├── /api/ollama         - AI integration
│   ├── /api/marketplace    - Buy modules
│   └── /api/tokens         - Token balance
└── Spawned Servers
    ├── localhost:3001 (DOOM Server)
    ├── localhost:3002 (Game Data)
    └── localhost:3003 (Tournament)
```

---

## ⚡ FEATURES

### 1. Multi-Server Management

Create multiple JSON servers on different ports:

```bash
POST /api/servers/create
# Returns: { port: 3001, url: "http://localhost:3001" }
```

Each server gets:
- Its own database file (`db-3001.json`)
- Independent process
- RESTful API
- Real-time monitoring

### 2. Ollama Integration

Connect your local Ollama instance:

```bash
# Start Ollama
ollama serve

# In Command Center:
Click "CONNECT TO OLLAMA"
```

Now you can:
- Chat with local LLMs
- Generate game content
- AI-powered features
- No API costs

### 3. Module Marketplace

Buy server upgrades with ASX tokens:

**Available Modules:**
- 🎮 DOOM Classic Server ($5)
- 🏆 Tournament Manager ($10)
- 🐘 PHP Server Module ($3)
- ⚡ WebSocket Upgrade ($2)
- 💾 Database GUI ($4)

### 4. Token Economy

- Start with 100 ASX tokens
- Buy modules and upgrades
- Future: Earn tokens by hosting tournaments
- Built-in wallet system

---

## 🖥️ COMMAND CENTER

The web interface provides:

### Dashboard
- Live server monitoring
- WebSocket status
- Ollama connection
- Token balance

### Server Management
- Create new servers
- Stop/start servers
- View request counts
- Monitor uptime

### Marketplace
- Browse modules
- Purchase with tokens
- Install automatically
- Category filtering

### Terminal
- Real-time logs
- System messages
- Error tracking
- Color-coded output

---

## 🎮 DOOM TOURNAMENTS (COMING SOON)

The path to DOOM tournaments:

**Phase 1:** ✅ Server infrastructure (DONE)
**Phase 2:** 🔄 DOOM server module
**Phase 3:** 🔄 Tournament bracket system
**Phase 4:** 🔄 Leaderboards
**Phase 5:** 🔄 Token rewards

---

## 🔧 API REFERENCE

### Create Server

```javascript
POST /api/servers/create

Response:
{
  "success": true,
  "server": {
    "id": "server-3001",
    "port": 3001,
    "url": "http://localhost:3001"
  }
}
```

### List Servers

```javascript
GET /api/servers

Response:
{
  "servers": [
    {
      "id": "server-3001",
      "port": 3001,
      "status": "running",
      "requestCount": 42,
      "created": "2025-10-24T..."
    }
  ]
}
```

### Connect Ollama

```javascript
POST /api/ollama/connect

Response:
{
  "success": true,
  "models": [
    { "name": "llama3" },
    { "name": "codellama" }
  ]
}
```

### Chat with Ollama

```javascript
POST /api/ollama/chat
{
  "model": "llama3",
  "messages": [
    { "role": "user", "content": "Hello!" }
  ]
}

Response:
{
  "message": {
    "role": "assistant",
    "content": "Hi there!"
  }
}
```

### Browse Marketplace

```javascript
GET /api/marketplace/modules

Response:
{
  "modules": [
    {
      "id": "doom-classic",
      "name": "DOOM Classic Server",
      "price": 5.00,
      "category": "game-servers",
      "icon": "🎮"
    }
  ]
}
```

### Check Token Balance

```javascript
GET /api/tokens/balance

Response:
{
  "balance": 100.00
}
```

---

## 🌐 DEPLOYMENT

### Local Development

```bash
npm start
```

### Production with Cloudflare Tunnel

```bash
# Terminal 1: Start server
npm start

# Terminal 2: Expose to internet
cloudflared tunnel --url http://localhost:3000
```

### Mobile (Termux)

```bash
pkg install nodejs
npm install
npm start
```

---

## 📁 FILE STRUCTURE

```
asx-doom-server/
├── server.js           # Main server (command center)
├── spawn-server.js     # Creates child JSON servers
├── package.json        # Dependencies
├── public/
│   └── index.html      # Command Center UI
└── data/               # Created automatically
    ├── db-3001.json    # Server databases
    ├── db-3002.json
    └── db-3003.json
```

---

## 🎨 CUSTOMIZATION

### Adding New Modules

Edit `server.js`:

```javascript
{
  id: 'my-module',
  name: 'My Cool Module',
  price: 7.50,
  description: 'Does something awesome',
  category: 'tools',
  icon: '🔧'
}
```

### Custom Server Ports

Start with different base port:

```javascript
const server = new ASXDoomServer();
server.port = 4000; // Use 4000 instead of 3000
```

---

## ❓ FAQ

**Q: Do I need React?**  
A: No! Pure HTML/CSS/JavaScript.

**Q: Do I need Vite?**  
A: No! No build step required.

**Q: Do I need Node.js?**  
A: Yes, but only to run JSON Server. It's minimal - just 3 dependencies.

**Q: Can I use this for DOOM tournaments?**  
A: Yes! That's the goal. Install the DOOM modules from the marketplace.

**Q: How do I connect Ollama?**  
A: Run `ollama serve` then click "CONNECT TO OLLAMA" in the UI.

**Q: Where do I get ASX tokens?**  
A: Currently demo mode. Production: integrate with blockchain.

**Q: Can I run multiple instances?**  
A: Yes! Each spawned server is independent.

---

## 🔥 WHAT MAKES THIS SPECIAL

### vs Traditional React Apps

| Feature | ASX DOOM | React App |
|---------|----------|-----------|
| Dependencies | 3 | 50+ |
| Build Step | None | Required |
| Bundle Size | ~100KB | ~2MB+ |
| node_modules | ~5MB | ~500MB |
| npm install | 2 seconds | 5 minutes |
| Learning Curve | Minimal | Steep |

### vs JSON Server Alone

ASX DOOM adds:
- ✅ Multi-server management
- ✅ Beautiful HUD interface
- ✅ WebSocket real-time updates
- ✅ Ollama AI integration
- ✅ Module marketplace
- ✅ Token economy

---

## 🛠️ TROUBLESHOOTING

### "Cannot connect to WebSocket"

- Check if server is running
- Try refreshing the page
- WebSocket connects to same host

### "Ollama not connecting"

```bash
# Make sure Ollama is running:
ollama serve

# Check if it's accessible:
curl http://localhost:11434/api/tags
```

### "Server creation failed"

- Check if port is already in use
- Ensure `data/` directory is writable
- Check Node.js version (needs 14+)

---

## 🚀 NEXT STEPS

1. **Install DOOM Module** - Coming soon!
2. **Set up tournaments** - Create bracket system
3. **Add more games** - Quake, Unreal Tournament, etc.
4. **Blockchain integration** - Real ASX token economy
5. **Mobile app** - Native mobile support

---

## 📝 LICENSE

MIT License - Do whatever you want with it!

---

## 🙏 CREDITS

Built with:
- JSON Server (Typicode)
- WebSocket (ws)
- Express
- Pure HTML/CSS/JavaScript
- Love for retro gaming 🎮

---

## 💬 SUPPORT

**Issues?** Open a GitHub issue  
**Questions?** Check the FAQ  
**Want to contribute?** PRs welcome!

---

**LET'S BUILD THE FUTURE OF DECENTRALIZED GAMING! 🚀🎮⚡**
