# ASX DOOM CONSTRUCTION SET - QUICK REFERENCE

**AI-Powered World Building | One-Page Cheat Sheet**

---

## 🚀 INSTANT START

```bash
ollama serve                    # Start AI
npm install && npm run dev      # Start constructor
open http://localhost:3000      # Open in browser
```

**First Command:** `"Load circular arena template"`

---

## 🤖 AI COMMANDS BY CATEGORY

### 🌍 TERRAIN

```
"Create a circular platform 50 meters wide"
"Generate rocky terrain 100x100 with erosion"
"Raise the center by 5 meters"
"Add lava rivers flowing from corners"
"Make the ground more hellish"
"Smooth the edges"
"Apply Perlin noise for detail"
```

### 👹 ENEMIES

```
"Add 5 imps in a circle around center"
"Place a baron of hell at x:0, z:50"
"Spawn 10 zombies randomly"
"Create a patrol route from A to B"
"Set enemies to ambush mode"
"Add boss fight with 3 phases"
```

### 💡 LIGHTING

```
"Set up hellscape lighting"
"Make it darker and more red"
"Add flickering torches every 10 meters"
"Create dramatic shadows"
"Add volumetric fog"
"Place a spotlight on the altar"
```

### 🏛️ ARCHITECTURE

```
"Build walls 5 meters high around perimeter"
"Add a stairway to the second floor"
"Create gothic pillars in a row"
"Place doors at cardinal points"
"Build a platform 20x20 at height 5"
```

### 🎯 ITEMS

```
"Add shotgun pickups at corners"
"Place health packs around the map"
"Put rocket launcher in center"
"Scatter ammo throughout"
"Add armor in the side room"
```

### 🎨 ATMOSPHERE

```
"Add fire particles"
"Make it foggy"
"Add dust rays through windows"
"Create blood drips from ceiling"
"Add ambient wind sounds"
```

---

## ⌨️ KEYBOARD SHORTCUTS

### General
- `Ctrl+S` - Save level
- `Ctrl+Z` - Undo
- `Ctrl+Y` - Redo
- `Delete` - Delete selected
- `F1` - Manual
- `~` - AI console

### Viewport
- `WASD` - Fly camera
- `Q/E` - Up/Down
- `Shift` - Fast movement
- `Alt+Click` - Select
- `F` - Focus selected
- `G` - Toggle grid

### Tools
- `T` - Terrain tools
- `N` - NPC spawner
- `P` - Play test
- `Esc` - Exit test

---

## 🎮 AI MODES

### Builder (Default)
**Use for:** Precise construction
**Example:** `"Create platform 50x50 at height 10"`

### Designer
**Use for:** Creative advice
**Switch:** `"Switch to designer mode"`
**Example:** `"How should I design this boss fight?"`

### Technical
**Use for:** Performance issues
**Switch:** `"Switch to technical mode"`
**Example:** `"Why is my level slow?"`

---

## 📦 TEMPLATES

### Load
`"Load [template name]"`

### Available
- **arena_circular** - Deathmatch arena
- **cathedral** - Gothic horror level
- **hangar** - E1M1-style campaign
- **hellscape_basic** - Terrain preset

---

## 🎯 QUICK WORKFLOWS

### Build Arena (2 min)
```
1. "Load circular arena"
2. "Make it 80 meters"
3. "Add 10 enemies"
4. "Add more weapons"
5. Press P to test
```

### Design Boss Fight (5 min)
```
1. "Create a 60x60 boss arena"
2. "Add baron of hell boss"
3. "Give it 3 phases"
4. "Add cover pillars"
5. "Place health pickups"
```

### Sculpt Terrain (3 min)
```
1. "Create 200x200 terrain"
2. Click Terrain Tools
3. Select Raise brush
4. Sculpt mountains
5. "Add lava rivers"
```

---

## 🔧 TROUBLESHOOTING

**AI Not Responding**
```bash
curl http://localhost:11434/api/tags  # Check Ollama
ollama serve                          # Start if needed
```

**Template Won't Load**
- Check browser console (F12)
- Verify file path
- Check JSON syntax

**Slow Performance**
- Say: `"Switch to technical mode"`
- Say: `"Why is this slow?"`
- Follow AI recommendations

---

## 💡 PRO TIPS

**Iterate Quickly**
```
"Create arena" → "Make bigger" → "Add enemies" → "Darker"
```

**Use Formations**
```
"Add 8 imps in circle radius 20"
"Place 5 demons in line facing center"
```

**Layer Lighting**
```
1. Set ambient
2. Add directional
3. Add point lights (details)
4. Add particles
```

**Test Often**
- Press `P` frequently
- Iterate based on feel
- Adjust and repeat

---

## 📚 RESOURCES

**Full Manual:** `manual/complete-manual.md`

**Templates:** `templates/*.json`

**Examples:**
- Arena: `templates/arena_circular.json`
- Cathedral: `templates/cathedral.json`

**Support:** Check README.md

---

## 🎓 LEARNING PATH

**Day 1:** Load templates, use AI, basic sculpting
**Day 2:** Create layouts, place enemies, lighting
**Day 3:** Boss fights, custom behaviors, optimization
**Day 4:** Build complete level start to finish

---

## 🔥 POWER COMBOS

**Instant Arena**
```
"Load circular arena" + "Make it 100 meters" + "Add 20 enemies"
```

**Horror Atmosphere**
```
"Dark purple lighting" + "Add fog" + "Flickering lights" + "Blood decals"
```

**Epic Boss Fight**
```
"80x80 arena" + "Baron boss with phases" + "Cover pillars" + "Health pickups"
```

**Procedural Terrain**
```
"200x200 terrain" + "Apply Perlin noise" + "Add erosion" + "Lava rivers"
```

---

## 🎯 GOALS

✅ **Beginner:** Load template, modify with AI
✅ **Intermediate:** Build arena from scratch
✅ **Advanced:** Design complete campaign level
✅ **Expert:** Create template library

---

**REMEMBER:**

1. **AI understands context** - It remembers what you built
2. **Iterate quickly** - Small changes, test often
3. **Study templates** - They're masterclasses in design
4. **Use keyboard shortcuts** - Speed up workflow
5. **Have fun!** - You're building worlds

---

**START BUILDING NOW:**

1. Start Ollama: `ollama serve`
2. Load editor: `npm run dev`
3. Say: `"Create a hellscape arena"`
4. Watch magic happen ✨

---

**"If they can mod Skyrim, we can mod Hell."** 🔥

[View complete manual](manual/complete-manual.md) | [Templates](templates/) | [README](README.md)
