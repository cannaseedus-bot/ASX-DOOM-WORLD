# 🔥 ASX DOOM WORLD - LIVE DEMO DEPLOYMENT 🔥

## **INSTANT DEPLOYMENT TO YOUR SERVER**

Your server: `http://10.206.94.173:8000/`

---

## **📦 STEP 1: DOWNLOAD & EXTRACT**

```bash
# Download the demo package
# (Get asx-doom-demo.tar.gz from outputs)

# Extract to your server directory
cd /path/to/your/server/root
tar -xzf asx-doom-demo.tar.gz

# Your structure should now be:
# /your-server-root/
#   └── asx-doom-demo/
#       ├── index.html
#       ├── os/
#       ├── engine/
#       └── world/
```

---

## **🚀 STEP 2: ACCESS THE DEMO**

Once extracted, open in your browser:

```
http://10.206.94.173:8000/asx-doom-demo/
```

Or if extracted directly in root:

```
http://10.206.94.173:8000/index.html
```

---

## **🎮 STEP 3: PLAY!**

**Controls:**
- Click screen to start
- **WASD** = Move
- **Mouse** = Look around
- **Click** = Shoot (uses ammo)
- **Space** = Jump
- **~** (tilde) = Toggle debug info

---

## **✨ WHAT YOU'LL SEE**

1. **Welcome Screen**
   - Red "ASX DOOM WORLD" title
   - Click to enter

2. **HUD Overlay**
   - HP: 100/100 (red)
   - ARMOR: 0/100 (blue)
   - AMMO: 50/200
   - WEAPON: SHOTGUN

3. **3D Hellscape**
   - Red foggy atmosphere
   - Dark red ground
   - Gray/red walls
   - 4 red enemy cubes (placeholders)
   - Orange torch lights

4. **Debug Panel** (press ~)
   - Position coordinates
   - FPS counter
   - Enemy count

---

## **🔧 FEATURES IN THIS DEMO**

✅ **Three.js 3D Rendering**
- Real WebGL scene
- Fog effects
- Dynamic lighting
- Shadows enabled

✅ **FPS Controls**
- WASD movement
- Mouse look (pointer lock)
- Collision detection
- Jump mechanics
- Gravity physics

✅ **ASX Architecture**
- JSON-driven world
- Modular engine
- HUD system
- State management

✅ **Map System**
- Walls from JSON
- Enemy spawns
- Torch lights
- Player spawn point

---

## **📂 FILE STRUCTURE**

```
asx-doom-demo/
├── index.html                 # Main entry
├── os/
│   └── os.json               # Central registry
├── engine/
│   ├── asx.js               # Runtime kernel
│   ├── os-loader.js         # JSON loader
│   ├── three-integration.js # Scene builder
│   └── fps-controller.js    # Movement
└── world/
    └── maps/
        └── hellscape.json   # Level data
```

---

## **🎯 QUICK TROUBLESHOOTING**

### **Issue: Blank screen**
**Solution:** Check browser console (F12) for errors

### **Issue: Can't move**
**Solution:** Click screen to activate pointer lock

### **Issue: No 3D scene**
**Solution:** Ensure browser supports WebGL 2.0

### **Issue: CORS errors**
**Solution:** Files must be served via HTTP (not file://)

---

## **🔗 NEXT STEPS**

### **Want to modify the level?**

Edit `world/maps/hellscape.json`:

```json
{
  "walls": [
    { "x": 0, "z": -40, "w": 80, "h": 10, "d": 2 }
  ],
  "spawns": {
    "enemies": [
      { "type": "imp", "x": 10, "y": 4, "z": 10 }
    ]
  }
}
```

### **Want to change HUD?**

Edit `os/os.json`:

```json
{
  "hud": {
    "combat-hud": {
      "panels": [
        { "id": "hp", "label": "HEALTH", "value": 150 }
      ]
    }
  }
}
```

### **Want to add more enemies?**

Add entries in `hellscape.json`:

```json
"enemies": [
  { "type": "imp", "x": 20, "y": 4, "z": 20 }
]
```

---

## **📊 PERFORMANCE**

**Expected metrics:**
- FPS: 60 (on modern GPU)
- Load time: < 2 seconds
- Memory: ~50MB
- Network: ~200KB (Three.js CDN)

---

## **🔥 LIVE NOW!**

Once deployed, share with others:

```
http://10.206.94.173:8000/asx-doom-demo/
```

**Enjoy the hellscape!** 🎮💀

---

**ASX Interactive Systems • 2025**
