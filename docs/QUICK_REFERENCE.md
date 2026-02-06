# 🎮 **ASX DOOM WORLD - QUICK REFERENCE CARD** 🎮

**One-page cheat sheet for developers**

---

## **📁 FILE STRUCTURE**

```
asx-doom-world/
├── index.html              # Game runtime
├── editor.html             # Level editor
├── os/os.json              # Central registry
├── engine/                 # Phase 1: Runtime
│   ├── asx.js
│   ├── fps-controller.js
│   ├── weapon-system.js
│   └── game-state.js
├── constructor/            # Phase 2: Editor
│   ├── viewport.js
│   ├── terrain-tools.js
│   └── level-compiler.js
├── ai/                     # Phase 3: NPCs
│   ├── ollama-bridge.js
│   ├── npc-brain.js
│   └── pathfinding.js
├── multiplayer/            # Phase 4: Netcode
│   ├── websocket-server.js
│   ├── zandronum-manager.js
│   └── lobby-manager.js
└── world/maps/             # Level JSON files
```

---

## **⚡ QUICK COMMANDS**

### **Development**
```bash
# Serve locally
python -m http.server 8000

# Start Ollama (for AI)
ollama serve

# Start multiplayer server
node server.js
```

### **Ollama Models**
```bash
ollama pull llama3.1:7b    # Main NPC brain
ollama pull mistral:7b     # Faster alternative
```

---

## **🎯 CORE CONCEPTS**

### **ASX JSON Pattern**
```json
{
  "scene": {
    "hud": { "type": "dom", "panels": [...] },
    "webgl": { "scene": "hellscape" },
    "asx": { "inline": "gameLogic()" }
  }
}
```

### **Map Format**
```json
{
  "name": "my-map",
  "walls": [{ "x": 0, "z": -40, "w": 80, "h": 10 }],
  "spawns": {
    "player": { "x": 0, "y": 4, "z": 0 },
    "enemies": [{ "type": "imp", "x": 10, "z": 10 }]
  }
}
```

### **NPC Config**
```json
{
  "type": "imp",
  "stats": { "hp": 100, "speed": 0.08 },
  "personality": { "aggression": 0.8 },
  "ollama": { "model": "llama3.1:7b" }
}
```

---

## **🔧 ESSENTIAL APIs**

### **Phase 1: Runtime**
```javascript
// Load OS
const osData = await loadOS('./os/os.json');
const runtime = new ASXRuntime(osData);

// Update HUD
runtime.updateHUD('hp', 75, 100);

// FPS controller
const fps = new ASXFPSController(camera, canvas, scene);
fps.update(delta);

// Shoot weapon
weapons.fire();
```

### **Phase 2: Editor**
```javascript
// Compile level
const result = levelCompiler.compile();
levelCompiler.export('json');

// Paint terrain
terrainTools.paint(intersect, 'raise');

// Place asset
assetBrowser.placeAsset(asset, position);
```

### **Phase 3: AI**
```javascript
// Create NPC brain
const brain = new NPCBrain(config);
const decision = await brain.think(context);

// Pathfinding
const path = pathfinding.findPath(start, end);

// NPC controller
const controller = new NPCController(npc, scene);
controller.update(delta);
```

### **Phase 4: Multiplayer**
```javascript
// WebSocket server
const server = new GameServer(3001);

// Client connect
const client = new NetcodeClient('ws://localhost:3001');
await client.connect();
client.join('PlayerName');

// Zandronum
const zandronum = new ZandronumManager();
await zandronum.createServer({ port: 10666 });
```

---

## **🎨 KEYBOARD SHORTCUTS**

### **Game (Phase 1)**
```
WASD         - Move
Mouse        - Look
Click        - Shoot
Space        - Jump
C/Ctrl       - Crouch
~            - Debug panel
```

### **Editor (Phase 2)**
```
Q            - Select tool
W            - Move tool
E            - Rotate tool
R            - Scale tool
T            - Terrain tool
L            - Light tool
N            - Spawn tool
Ctrl+S       - Save
Ctrl+Z       - Undo
Delete       - Delete selected
```

---

## **🐛 DEBUG TIPS**

### **Check Three.js Scene**
```javascript
console.log(scene.children);
scene.traverse(obj => console.log(obj.type, obj.name));
```

### **Monitor Game State**
```javascript
console.log(gameState.player);
console.log(weapons.getCurrentWeapon());
```

### **Test Collision**
```javascript
fps.checkCollision(direction); // Returns true if blocked
```

### **Verify Ollama**
```bash
curl http://localhost:11434/api/tags  # List models
```

---

## **📊 PERFORMANCE TARGETS**

```
FPS:           60Hz minimum
Tick Rate:     60Hz server
NPC Budget:    10 active AI max
Poly Count:    < 100k triangles
Draw Calls:    < 500 per frame
Netcode:       < 100ms latency
```

---

## **🔗 EXTERNAL LINKS**

- Three.js: https://threejs.org/docs/
- Ollama: https://ollama.com/
- Zandronum: https://zandronum.com/
- WebGL: https://webglfundamentals.org/

---

## **📝 COMMON PATTERNS**

### **Spawning Enemy**
```javascript
const enemy = new THREE.Mesh(geometry, material);
enemy.position.set(x, y, z);
enemy.userData.type = 'enemy';
enemy.userData.health = 100;
scene.add(enemy);
```

### **Creating Light**
```javascript
const light = new THREE.PointLight(0xff4400, 2, 15);
light.position.set(x, y, z);
light.castShadow = true;
scene.add(light);
```

### **Raycasting**
```javascript
raycaster.setFromCamera(mouse, camera);
const intersects = raycaster.intersectObjects(scene.children);
```

---

## **⚠️ GOTCHAS**

❌ **Don't:** Modify objects in render loop  
✅ **Do:** Update in game logic, render reads only

❌ **Don't:** Use localStorage in artifacts  
✅ **Do:** Use React state or memory variables

❌ **Don't:** Hardcode paths  
✅ **Do:** Load from os.json registry

❌ **Don't:** Block with await in tight loops  
✅ **Do:** Use requestAnimationFrame properly

---

## **🎯 PHASE CHECKLIST**

### **Phase 1: Runtime** ✅
- [ ] FPS controls work
- [ ] Collision detects walls
- [ ] Weapons shoot/hit
- [ ] HUD updates properly

### **Phase 2: Editor** ✅
- [ ] Viewport renders 3D
- [ ] Can place objects
- [ ] Terrain sculpting works
- [ ] Export produces valid JSON

### **Phase 3: AI** ✅
- [ ] Ollama responds
- [ ] NPCs make decisions
- [ ] Pathfinding navigates
- [ ] Behavior trees execute

### **Phase 4: Multiplayer** ✅
- [ ] WebSocket connects
- [ ] State syncs between clients
- [ ] Zandronum server starts
- [ ] Tournaments can run

---

**Keep this card handy while coding!** 🚀

---

**ASX Interactive Systems • 2025**
