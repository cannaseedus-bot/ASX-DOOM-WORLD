# ⚡ ASX DOOM SERVER - QUICK START

Get up and running in minutes.

---

## 📋 PREREQUISITES

- Node.js 18+ installed
- Terminal/Command Prompt
- Web browser

---

## 🚀 INSTALLATION

### Step 1: Install Dependencies

```bash
cd asx-doom-server
npm install
```

---

### Step 2: Start Server

```bash
npm start
```

You should see a startup banner and the local port listed.

---

### Step 3: Open Browser

```
http://localhost:3000
```

---

## 🎮 FIRST ACTIONS

### Create Your First JSON Server

1. Click **"➕ CREATE NEW SERVER"**
2. Watch the terminal log
3. See your new server at `localhost:3001`

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

## 🧰 PROTOTYPE UI QUICK START

Open these files directly in a browser to explore the prototype UI surfaces:
- `chat.html`
- `simple-threejs-demo.html`
- `debug-threejs-asx.html`
- `threejs-asx-fantasy-scene.html`
