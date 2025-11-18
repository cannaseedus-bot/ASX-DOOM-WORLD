# 🔥 ASX DOOM WORLD - Complete Developer Compendium 🔥

**"War... war never changes."** — The ASX DOOM manifesto

---

## **📘 MASTER DOCUMENTATION SET**

This repository contains the **complete ASX DOOM WORLD development stack** across 4 operational phases, unified by the ASX JSON architecture.

### **🎯 What is ASX DOOM WORLD?**

A **modular, JSON-driven 3D game engine** that fuses:
- 🎮 **DOOM-style FPS** (fast-paced combat)
- 🏰 **Skyrim-level RPG** (stats, classes, skill trees)
- 🛠️ **TES Construction Set** (visual level editor)
- 🤖 **Ollama AI NPCs** (intelligent enemies)
- 🌐 **Dual Multiplayer** (Classic DOOM + Modern WebSocket)

**Zero frameworks. Zero build step. Pure JSON + Three.js.**

---

## **📚 PHASE DOCUMENTATION**

| Phase | System | Manual | Status |
|-------|--------|--------|--------|
| **1** | Core Runtime | [Compendium PDF](../ASX_DOOM_WORLD_Developer_Compendium_v1_0_Hellscape.pdf) | ✅ Complete |
| **2** | Construction Set | [PHASE_2_MANUAL.md](./PHASE_2_MANUAL.md) | ✅ Complete |
| **3** | AI & NPCs | [PHASE_3_QUICKSTART.md](./PHASE_3_QUICKSTART.md) | ✅ Complete |
| **4** | Multiplayer | [PHASE_4_QUICKSTART.md](./PHASE_4_QUICKSTART.md) | ✅ Complete |

---

## **🗂️ COMPLETE FILE MANIFEST**

### **Core Documentation**
- `ASX_DOOM_WORLD_Developer_Compendium_v1_0_Hellscape.pdf` — Master reference
- `README.md` — This file
- `ASX_JSON_SPEC.md` — JSON schema specification

### **Phase Manuals**
- `PHASE_2_MANUAL.md` — Construction Set (TES-style editor)
- `PHASE_3_QUICKSTART.md` — AI & NPC systems (Ollama)
- `PHASE_4_QUICKSTART.md` — Multiplayer (Zandronum + WebSocket)

### **Code Packages**
- `asx-doom-construction-set.tar.gz` — Complete Phase 2 codebase

---

## **🚀 QUICK START GUIDE**

### **Option 1: Read First (Recommended)**

```bash
# Read the master compendium
open ASX_DOOM_WORLD_Developer_Compendium_v1_0_Hellscape.pdf

# Study phase manuals in sequence
# Phase 1 → Phase 2 → Phase 3 → Phase 4
```

### **Option 2: Jump Into Code**

```bash
# Extract construction set
tar -xzf asx-doom-construction-set.tar.gz
cd asx-doom-world

# Serve locally (no build step!)
python -m http.server 8000

# Open browser
open http://localhost:8000
```

---

## **🎯 WHAT EACH PHASE DELIVERS**

### **Phase 1: Core Runtime Engine** ✅

**What it does:**
- FPS movement (WASD + mouse look)
- Collision detection (walls, terrain)
- Weapon system (raycast shooting)
- Health/ammo/score tracking
- Particle effects (blood, fire)
- 3D audio (positional sound)

**Files:**
- `index.html` — Game entry point
- `engine/asx.js` — Runtime kernel
- `engine/fps-controller.js` — Movement
- `engine/weapon-system.js` — Combat
- `engine/game-state.js` — Stats tracking

**Test:** Walk around hellscape, shoot enemies, check HUD

---

### **Phase 2: Construction Set** ✅

**What it does:**
- Visual level editor (like TES Construction Kit)
- Terrain sculpting (height painting)
- Asset browser (drag-drop models)
- Lighting designer (point/directional lights)
- NPC spawner (enemy placement)
- JSON compiler (export playable levels)

**Files:**
- `editor.html` — Editor entry point
- `constructor/viewport.js` — 3D editing
- `constructor/terrain-tools.js` — Sculpting
- `constructor/level-compiler.js` — Exporter

**Test:** Create new map, paint terrain, place enemies, export JSON

---

### **Phase 3: AI & NPC Systems** ✅

**What it does:**
- Ollama integration (local LLM)
- Behavior trees (decision making)
- Perception system (vision, hearing)
- Pathfinding (A* navigation)
- Dynamic dialogue (AI-generated)
- Group tactics (squad coordination)

**Files:**
- `ai/ollama-bridge.js` — LLM API
- `ai/npc-brain.js` — Intelligence
- `ai/behavior-tree.js` — Actions
- `ai/perception.js` — Senses
- `ai/pathfinding.js` — Navigation

**Test:** Spawn imp, watch it patrol, engage in combat, hear dialogue

---

### **Phase 4: Multiplayer Infrastructure** ✅

**What it does:**
- Zandronum server (classic DOOM)
- WebSocket netcode (modern sync)
- Lobby system (matchmaking)
- Tournament brackets (competitive)
- Leaderboards (rankings)
- Anti-cheat (validation)

**Files:**
- `multiplayer/zandronum-manager.js` — Classic server
- `multiplayer/websocket-server.js` — Modern server
- `multiplayer/netcode-client.js` — Client sync
- `multiplayer/lobby-manager.js` — Lobbies
- `multiplayer/tournament-manager.js` — Tournaments

**Test:** Start server, join with 2+ clients, deathmatch, check scoreboard

---

## **📐 ARCHITECTURE DIAGRAM**

```
┌─────────────────────────────────────────────────┐
│              ASX DOOM WORLD                     │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌────────────┐  ┌────────────┐  ┌──────────┐ │
│  │  Phase 1   │  │  Phase 2   │  │ Phase 3  │ │
│  │  Runtime   │→ │ Constructor│→ │   AI     │ │
│  │  Engine    │  │    Set     │  │  NPCs    │ │
│  └────────────┘  └────────────┘  └──────────┘ │
│         ↓                                ↓      │
│  ┌────────────────────────────────────────┐    │
│  │         Phase 4: Multiplayer           │    │
│  │  Zandronum + WebSocket + Tournaments   │    │
│  └────────────────────────────────────────┘    │
│                                                 │
├─────────────────────────────────────────────────┤
│           Core Technologies                     │
│  - Three.js (WebGL rendering)                   │
│  - Ollama (AI inference)                        │
│  - Zandronum (Classic DOOM)                     │
│  - WebSocket (Modern netcode)                   │
│  - ASX JSON (Data layer)                        │
└─────────────────────────────────────────────────┘
```

---

## **🔧 SYSTEM REQUIREMENTS**

### **Development**
- Node.js 18+
- Modern browser (Chrome 90+, Firefox 88+)
- 4GB RAM minimum
- WebGL 2.0 GPU support

### **Optional (Enhanced Features)**
- Ollama (for AI NPCs)
- Zandronum 3.1+ (for classic multiplayer)
- 8GB RAM (for AI + multiplayer)

---

## **📖 LEARNING PATH**

### **Beginner → Expert Roadmap**

1. **Week 1: Core Concepts**
   - Read compendium PDF (Phase 1 section)
   - Study ASX JSON spec
   - Run Phase 1 demo
   - Modify HUD/weapons

2. **Week 2: Level Creation**
   - Read Phase 2 manual
   - Open construction set
   - Build test level
   - Export and play

3. **Week 3: AI Integration**
   - Install Ollama
   - Read Phase 3 quickstart
   - Spawn intelligent NPCs
   - Configure behaviors

4. **Week 4: Multiplayer**
   - Setup Zandronum
   - Read Phase 4 quickstart
   - Host deathmatch
   - Run tournament

5. **Week 5+: Master Builder**
   - Create full campaign
   - Design boss battles
   - Balance multiplayer
   - Deploy public server

---

## **🎓 CODE EXAMPLES**

### **Create a New Level (Phase 2)**

```javascript
// In constructor
const level = {
  name: "blood-cathedral",
  title: "Blood Cathedral",
  walls: [...],
  spawns: {
    player: { x: 0, y: 4, z: 20 },
    enemies: [
      { type: "imp", x: 10, y: 4, z: -10 }
    ]
  },
  lighting: {
    ambient: { color: "#330000", intensity: 0.3 }
  }
};

// Export
levelCompiler.export(level);
```

### **Spawn AI NPC (Phase 3)**

```javascript
import { NPCController } from './ai/npc-controller.js';

const imp = {
  type: 'imp',
  personality: {
    aggression: 0.8,
    intelligence: 0.5
  },
  ollama: {
    model: 'llama3.1:7b'
  }
};

const controller = new NPCController(imp, scene, pathfinding);
controller.think(); // AI decides action
```

### **Start Multiplayer Server (Phase 4)**

```bash
# Classic DOOM
curl -X POST http://localhost:3000/api/doom/server/create \
  -d '{"map": "E1M1", "port": 10666}'

# Modern WebSocket
const server = new GameServer(3001);
const client = new NetcodeClient('ws://localhost:3001');
await client.connect();
```

---

## **🐛 TROUBLESHOOTING**

### **Phase 1 Issues**

**Problem:** Controls not working  
**Solution:** Click canvas, ensure pointer lock engaged

**Problem:** No collision  
**Solution:** Check `userData.collision = true` on walls

### **Phase 2 Issues**

**Problem:** Editor won't load  
**Solution:** Check browser console, ensure local server running

**Problem:** Can't export level  
**Solution:** Validate spawn points exist, check console errors

### **Phase 3 Issues**

**Problem:** Ollama not connecting  
**Solution:** Run `ollama serve`, check port 11434

**Problem:** NPCs frozen  
**Solution:** Ensure `controller.update(delta)` called in game loop

### **Phase 4 Issues**

**Problem:** Zandronum won't start  
**Solution:** Check DOOM.WAD exists in `wads/` folder

**Problem:** WebSocket connection failed  
**Solution:** Verify port 3001 not blocked by firewall

---

## **🤝 CONTRIBUTING**

**This is an ASX Interactive Systems project.**

Want to contribute?
- Report bugs via GitHub issues
- Submit level designs
- Share AI personalities
- Create multiplayer maps

---

## **📜 CREDITS**

**Architecture:** Michael / ASX Interactive Systems  
**Engine:** Three.js, Ollama, Zandronum  
**Inspiration:** DOOM (id Software), TES (Bethesda)

---

## **📄 LICENSE**

See individual component licenses:
- Three.js: MIT
- Ollama: MIT
- Zandronum: Sleepycat License
- ASX DOOM Code: TBD

---

## **🔗 QUICK LINKS**

- **Three.js Docs:** https://threejs.org/docs/
- **Ollama:** https://ollama.com/
- **Zandronum:** https://zandronum.com/
- **DOOM Wiki:** https://doomwiki.org/

---

## **🎯 NEXT STEPS**

Ready to build? Choose your path:

- **👨‍💻 Developer:** Read compendium PDF → Code Phase 1
- **🎨 Level Designer:** Read Phase 2 manual → Open editor
- **🤖 AI Engineer:** Read Phase 3 quickstart → Configure NPCs
- **🌐 Server Admin:** Read Phase 4 quickstart → Deploy multiplayer

---

**"The JSON flows. The DOOM engine breathes. War never changes."** 🔥

**— ASX Interactive Systems, 2025**
