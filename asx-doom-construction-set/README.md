# ASX DOOM Construction Set

**Version 1.0** | *TES-style level editor for building DOOM hellscape worlds*

Created by **Michael** - ASX Interactive Systems

---

## 🎯 Overview

ASX DOOM Construction Set is a **professional-grade level editor** that combines:

- **Three.js** 3D rendering engine
- **ASX JSON** data-driven architecture
- **Ollama AI** for natural language world building
- **TES Construction Set** interface philosophy

**Build worlds by talking to them:**
```
You: "Create a hellscape arena with lava moat"
AI: ✓ Builds complete arena with terrain, lighting, spawns

You: "Add 5 imp spawners in circular pattern"
AI: ✓ Places enemies with patrol behaviors

You: "Make it more dramatic"
AI: ✓ Adjusts lighting, adds particles, tweaks atmosphere
```

---

## 🚀 Quick Start

### Prerequisites

1. **Node.js** v18+ ([Download](https://nodejs.org/))
2. **Ollama** with llama3.1:7b ([Download](https://ollama.ai/))
   ```bash
   ollama pull llama3.1:7b
   ollama serve
   ```
3. **Modern Browser** (Chrome, Firefox, Edge)

### Installation

```bash
# Clone repository
git clone https://github.com/cannaseedus-bot/asx-doom-construction-set.git
cd asx-doom-construction-set

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
open http://localhost:3000
```

### 5-Minute Tutorial

1. **Load a Template**
   - Click `📦 Templates`
   - Select "Circular Arena"
   - Click "Load Template"

2. **Customize with AI**
   - Open `🤖 AI Assistant`
   - Say: `"Add 10 enemies around the edges"`
   - AI builds it instantly

3. **Test It**
   - Click `▶️ Play Test`
   - Play in FPS mode
   - Press `Esc` to return

4. **Export**
   - Click `📦 Compile`
   - Choose "ASX JSON"
   - Save your level

**Done!** You built a DOOM level in 5 minutes.

---

## 📁 Project Structure

```
asx-doom-construction-set/
├── index.html                 # Boot frame
├── package.json              # Dependencies
├── README.md                 # This file
│
├── os/
│   └── os.json               # Main registry (routes, pages, configs)
│
├── engine/
│   ├── asx.js                # ASX runtime kernel
│   ├── os-loader.js          # Boot system
│   ├── ai-assistant.js       # Ollama AI integration ⭐
│   ├── constructor-core.js   # Three.js editor engine ⭐
│   └── terrain-system.js     # Terrain sculpting ⭐
│
├── renderer/
│   ├── dom-hud.js            # UI overlay system
│   ├── webgl-doom.js         # Three.js scene renderer
│   └── scenes/
│       ├── construction-mode.js
│       ├── hellscape.js
│       └── arena.js
│
├── constructor/
│   ├── npc-system.js         # Enemy spawning & AI
│   ├── lighting-system.js    # Lighting tools
│   ├── particle-system.js    # Atmosphere effects
│   ├── architecture-system.js # Walls, doors, platforms
│   └── optimization-system.js # Performance tools
│
├── templates/                 # Pre-built environments ⭐
│   ├── arena_circular.json   # Deathmatch arena
│   ├── cathedral.json        # Gothic horror level
│   ├── hangar.json           # E1M1-style campaign
│   └── hellscape_basic.json  # Terrain preset
│
├── assets/
│   ├── textures/
│   │   └── 3d/              # Three.js textures
│   ├── models/              # GLTF models
│   ├── sounds/              # Audio files
│   └── wads/                # Freedoom WADs
│
├── manual/
│   └── complete-manual.md    # Full documentation ⭐
│
└── roms/                     # Modular apps
    ├── doom-constructor/     # Main editor
    ├── doom-classic/         # Zandronum integration
    └── doom-multiplayer/     # Server management
```

**⭐ = Core files you'll work with most**

---

## 🤖 AI Assistant Guide

### How It Works

The AI uses **Ollama (llama3.1:7b)** to understand natural language and translate it into executable ASX JSON commands.

### Three Modes

1. **Builder Mode** (default)
   - Precise construction commands
   - Outputs executable JSON
   - Use for: "Build this specific thing"

2. **Designer Mode**
   - Creative suggestions
   - Gameplay advice
   - Use for: "How should I design this?"

3. **Technical Mode**
   - Performance optimization
   - Debug analysis
   - Use for: "Why is this slow?"

### Command Examples

**Terrain:**
```
"Create a circular platform 50 meters wide"
"Generate rocky terrain with lava rivers"
"Raise the center 5 meters"
```

**Enemies:**
```
"Add 5 imps in a circle around center"
"Place a baron of hell boss at the altar"
"Spawn 10 zombies in formation"
```

**Lighting:**
```
"Set up hellscape lighting"
"Add flickering torches on the walls"
"Make it darker and more red"
```

**Architecture:**
```
"Build walls around the perimeter"
"Add a stairway to the balcony"
"Create gothic pillars every 10 meters"
```

---

## 📦 Templates

### Included Templates

**Arenas (Deathmatch)**
- `arena_circular.json` - Classic circular arena
- `arena_towers.json` - Multi-level tower arena
- `arena_hellpit.json` - Lava pit with platforms

**Campaigns (Single-player)**
- `hangar.json` - UAC Hangar (E1M1 style)
- `cathedral.json` - Gothic horror cathedral
- `server_core.json` - High-tech server room

**Environments (Terrain)**
- `hellscape_basic.json` - Rocky hellscape
- `tech_facility.json` - Sci-fi environment
- `wasteland.json` - Demon wasteland

### Template Structure

Every template includes:
```json
{
  "terrain": {...},
  "architecture": {...},
  "enemies": {...},
  "items": {...},
  "spawns": {...},
  "lighting": {...},
  "particles": {...},
  "audio": {...}
}
```

See `templates/arena_circular.json` and `templates/cathedral.json` for complete examples.

---

## ⛰️ Terrain System

### Sculpting Tools

**Brushes:**
- **Raise** ⬆️ - Lift terrain
- **Lower** ⬇️ - Dig down
- **Flatten** ▬ - Level surface
- **Smooth** 〰️ - Soften edges
- **Noise** 📊 - Add detail

**Workflow:**
1. Create base terrain (AI or manual)
2. Sculpt major features (hills, valleys)
3. Add medium details (slopes, ridges)
4. Smooth transitions
5. Add noise for realism

### Procedural Generation

**Algorithms:**
- **Perlin Noise** - Natural hills and valleys
- **Voronoi** - Rocky, cellular patterns
- **Erosion** - Realistic weathering

**Example:**
```javascript
terrain.generateProcedural('perlin', {
  octaves: 4,
  scale: 50,
  height: 20,
  seed: Math.random()
});
```

---

## 👹 NPC & Enemy System

### Enemy Types

**Tier 1: Fodder**
- Zombie (HP: 20)
- Imp (HP: 60)

**Tier 2: Mid-Level**
- Demon (HP: 150)
- Cacodemon (HP: 400)

**Tier 3: Bosses**
- Baron of Hell (HP: 1000)
- Cyberdemon (HP: 4000)

### AI Behaviors

**Presets:**
- **Patrol** - Walk waypoints, attack on sight
- **Guard** - Stay at post, defend area
- **Hunt** - Actively seek player
- **Ambush** - Hide and surprise

**Custom AI:**
Each enemy uses Ollama to make decisions:
```json
{
  "npc": "Imp",
  "model": "llama3.1:7b",
  "prompt": "You are patrolling imp. Attack if player within 20m.",
  "temperature": 0.5
}
```

---

## 💡 Lighting System

### Light Types

- **Ambient** - Global base lighting
- **Directional** - Sun/moon (shadows)
- **Point** - Omnidirectional (torches)
- **Spot** - Focused beam
- **Hemisphere** - Sky/ground blend

### Presets

**Hellscape:**
```json
{
  "ambient": "#330000",
  "directional": {"color": "#ff0000", "intensity": 0.7},
  "fog": {"color": "#440000"}
}
```

**Tech Facility:**
```json
{
  "ambient": "#001133",
  "directional": {"color": "#0066ff", "intensity": 0.5},
  "fog": {"color": "#000011"}
}
```

---

## 📦 Compilation & Export

### Export Formats

1. **ASX JSON** (native)
   - Full scene data
   - AI configurations
   - Multiplayer support
   - Use for: Web playback

2. **WAD** (Zandronum)
   - Classic DOOM format
   - Multiplayer servers
   - Use for: Dedicated servers

3. **GLTF Scene**
   - 3D geometry export
   - Materials & textures
   - Use for: External tools

### Export Process

1. Click `📦 Compile`
2. Run validation checks
3. Choose optimization options
4. Select export format
5. Download file

---

## 🎮 Multiplayer Setup

### Zandronum Integration

1. **Install Zandronum**
   ```bash
   # See DOOM_SETUP_GUIDE.pdf
   ```

2. **Get DOOM.WAD**
   - Freedoom (free): https://freedoom.github.io
   - Official (paid): Steam/GOG

3. **Start Server**
   ```bash
   # Via API
   curl -X POST http://localhost:3000/api/doom/server/quickstart
   
   # Via UI
   Click "Multiplayer Manager" → "Quick Start"
   ```

4. **Connect**
   ```bash
   zandronum.exe -connect localhost:10666
   ```

---

## 🔧 Advanced Topics

### Custom Scripts

Create inline ASX logic:
```javascript
asx.inline: `
  onBoot(() => {
    console.log('Level loaded');
  });
  
  onTick(() => {
    // Update logic
  });
  
  listen('player_damage', (data) => {
    // Handle events
  });
`
```

### Performance Optimization

**Tools:**
- **LOD Generation** - Reduce distant polygons
- **Mesh Merging** - Combine static geometry
- **Occlusion Culling** - Hide blocked objects
- **Lightmap Baking** - Pre-compute lighting

**AI Technical Mode:**
```
You: "Why is my level running at 20 FPS?"
AI: [analyzes scene]
    - 450 draw calls (reduce to 150)
    - 50 shadow casters (reduce to 10)
    [suggests optimizations]
```

---

## 📚 Documentation

### Manual

Complete 30-chapter manual: `manual/complete-manual.md`

**Contents:**
1. Getting Started
2. AI Assistant
3. Templates & Assets
4. Terrain & Environment
5. NPCs & AI
6. Lighting & Atmosphere
7. Advanced Topics
8. Reference

### API Reference

**ASX JSON Specification:**
- Routes: Hash-based routing
- Pages: UI definitions
- Scenes: WebGL configurations
- Logic: Inline scripts

**Three.js Integration:**
- Scene management
- Asset loading
- Camera controls
- Raycasting

---

## 🐛 Troubleshooting

### Common Issues

**"Ollama not responding"**
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Start Ollama
ollama serve
```

**"Templates not loading"**
- Check browser console for errors
- Verify JSON syntax
- Ensure file paths are correct

**"Performance is slow"**
- Use Technical Mode AI analysis
- Reduce polygon count
- Lower shadow quality
- Disable unnecessary lights

---

## 🤝 Contributing

### Development Setup

```bash
# Install dev dependencies
npm install --save-dev

# Run in development mode
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Adding Templates

1. Create JSON file in `templates/`
2. Follow template structure
3. Test in editor
4. Add to `os.json` template registry

### Creating Assets

**Models:**
- Format: GLTF/GLB
- Triangle budget: <10K per object
- Textures: Power-of-two sizes

**Textures:**
- Format: JPG, PNG
- Recommended: 1024x1024 or 2048x2048
- Include: diffuse, normal, roughness

---

## 📄 License

**ASX DOOM Construction Set**
MIT License

**Freedoom Assets**
BSD License - https://freedoom.github.io

**Three.js**
MIT License - https://threejs.org

---

## 🙏 Credits

**Created by:** Michael - ASX Interactive Systems

**Built with:**
- [Three.js](https://threejs.org) - 3D engine
- [Ollama](https://ollama.ai) - AI assistant
- [Freedoom](https://freedoom.github.io) - DOOM assets

**Inspired by:**
- id Software's DOOM
- Bethesda's TES Construction Set
- Valve's Hammer Editor

---

## 📞 Support

**Documentation:** `manual/complete-manual.md`

**Issues:** https://github.com/cannaseedus-bot/asx-doom-construction-set/issues

**Discord:** [ASX Community] (coming soon)

---

## 🎯 Roadmap

**v1.1 (Q1 2025)**
- [ ] Visual scripting system
- [ ] Animation timeline editor
- [ ] Particle editor UI
- [ ] Sound zone tools

**v1.2 (Q2 2025)**
- [ ] Collaborative editing
- [ ] Cloud template library
- [ ] AI texture generation
- [ ] Performance profiler

**v2.0 (Q3 2025)**
- [ ] VR editor mode
- [ ] Procedural building generator
- [ ] Advanced AI NPC conversations
- [ ] Built-in mod marketplace

---

**Start building hellscape worlds today!**

```bash
npm install
npm run dev
open http://localhost:3000
```

*"If they can mod Skyrim, we can mod Hell."* - Michael, 2025
