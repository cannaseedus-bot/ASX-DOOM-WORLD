# ASX DOOM Construction Set - Complete Manual
## Your Guide to Building Hellscape Worlds

---

## Table of Contents

### 📖 Part 1: Getting Started
1. [Introduction to ASX DOOM Constructor](#introduction)
2. [Understanding the Interface](#interface)
3. [Your First Level (5-Minute Tutorial)](#first-level)
4. [Keyboard Shortcuts Reference](#shortcuts)

### 🤖 Part 2: AI Assistant
5. [Using the AI Assistant](#ai-basics)
6. [Natural Language Commands](#ai-commands)
7. [AI Command Examples](#ai-examples)
8. [AI Modes: Builder, Designer, Technical](#ai-modes)

### 📦 Part 3: Templates & Assets
9. [Working with Templates](#templates)
10. [Understanding Template JSON](#template-json)
11. [Asset Browser Guide](#assets)
12. [Creating Custom Assets](#custom-assets)

### ⛰️ Part 4: Terrain & Environment
13. [Terrain Sculpting Basics](#terrain-basics)
14. [Procedural Generation](#procedural)
15. [Texture Painting](#painting)
16. [Advanced Terrain Techniques](#terrain-advanced)

### 👹 Part 5: NPCs & AI
17. [Spawning Enemies](#npc-spawning)
18. [AI Behavior with Ollama](#ai-behavior)
19. [Enemy Formations & Waves](#formations)
20. [Boss Fight Design](#boss-design)

### 💡 Part 6: Lighting & Atmosphere
21. [Lighting Fundamentals](#lighting-basics)
22. [Atmospheric Effects](#effects)
23. [Lighting Performance](#lighting-performance)
24. [Creating Mood with Light](#lighting-mood)

### 🔧 Part 7: Advanced Topics
25. [Custom ASX Scripts](#custom-scripts)
26. [Multiplayer Setup](#multiplayer)
27. [Performance Optimization](#optimization)
28. [Level Compilation](#compilation)

### 📚 Part 8: Reference
29. [ASX JSON Specification](#json-spec)
30. [API Reference](#api)
31. [Troubleshooting](#troubleshooting)

---

<a name="introduction"></a>
## 1. Introduction to ASX DOOM Constructor

### What is ASX DOOM Constructor?

ASX DOOM Constructor is a **TES Construction Set-style level editor** for building DOOM-inspired worlds. It combines:

- **Three.js** for 3D rendering
- **ASX JSON** for data-driven design
- **Ollama AI** for intelligent assistance
- **Natural language** world building

### Philosophy

Unlike traditional game editors that require technical knowledge, ASX Constructor lets you **describe what you want** and the AI builds it:

```
You: "Create a hellscape arena with lava moat"
AI: [builds complete arena with terrain, lighting, spawns]

You: "Add 5 imp spawners in circular pattern"  
AI: [places enemies with patrol behaviors]

You: "Make it look more dramatic"
AI: [adjusts lighting, adds particles, tweaks atmosphere]
```

### Key Features

✅ **AI-Powered Building** - Natural language commands
✅ **Pre-Built Templates** - Start with professional layouts
✅ **Real-Time Preview** - See changes instantly
✅ **Modular Design** - ASX JSON architecture
✅ **Ollama Integration** - Smart NPC behaviors
✅ **Export Options** - ASX JSON, WAD, GLTF

---

<a name="interface"></a>
## 2. Understanding the Interface

### Main Layout

```
┌─────────────────────────────────────────────┐
│  🤖 AI  📦 Templates  🎨 Assets  ⛰️ Terrain  │  ← Toolbar
├──────────┬──────────────────────┬───────────┤
│          │                      │           │
│  Scene   │                      │ Inspector │
│  Tree    │    3D Viewport       │           │
│          │                      │ Properties│
│          │                      │           │
├──────────┴──────────────────────┴───────────┤
│  AI Console & Logs                          │  ← AI Chat
└─────────────────────────────────────────────┘
```

### 1. Toolbar (Top)
Quick access to all major tools:
- **🤖 AI Assistant** - Natural language commands
- **📦 Templates** - Pre-built environments
- **🎨 Asset Browser** - Models, textures, sounds
- **⛰️ Terrain Tools** - Sculpt and paint
- **👹 NPC Spawner** - Enemy placement
- **💡 Lighting Studio** - Lights and atmosphere
- **📦 Compile** - Export your level
- **▶️ Play Test** - Test in FPS mode
- **📖 Manual** - This guide

### 2. Scene Hierarchy (Left Panel)
Tree view of everything in your level:
```
📁 Level_E1M1
├─ 🌍 Terrain
├─ 💡 Lighting
│  ├─ Ambient
│  ├─ Directional_Main
│  └─ Point_Torch_01
├─ 👹 Enemies
│  ├─ Imp_01
│  ├─ Imp_02
│  └─ Baron_Boss
├─ 🎯 Spawns
│  ├─ PlayerSpawn_01
│  └─ PlayerSpawn_02
└─ 🏛️ Architecture
   ├─ Wall_North
   └─ Door_Exit
```

### 3. 3D Viewport (Center)
Your main working area:
- **Left Click + Drag** - Rotate camera
- **Right Click + Drag** - Pan camera
- **Scroll Wheel** - Zoom in/out
- **Middle Click** - Focus on selected object
- **W/A/S/D** - Fly camera
- **Shift** - Move faster
- **Alt + Click** - Select object

### 4. Inspector (Right Panel)
Edit selected object properties:
- **Transform** - Position, rotation, scale
- **Material** - Textures, colors
- **Behavior** - AI, interactions
- **Physics** - Collision, mass

### 5. AI Console (Bottom)
Chat with AI assistant:
```
You: Create an arena 50x50 with weapons at corners
AI: ✓ Created circular platform 50m diameter
    ✓ Added 4 weapon spawns at cardinal points
    ✓ Set up player starts
    ✓ Applied hellscape lighting
```

---

<a name="first-level"></a>
## 3. Your First Level (5-Minute Tutorial)

### Step 1: Start with a Template (1 minute)

1. Click **📦 Templates** in toolbar
2. Browse to **Arenas → Circular Arena**
3. Click **Load Template**
4. The arena appears in viewport

**What you get:**
- 50m circular platform
- 8 player spawn points
- 4 weapon pickups
- Hellscape lighting
- Lava particles

### Step 2: Ask AI to Customize (2 minutes)

Open **🤖 AI Assistant** and say:

```
"Make it bigger - 80 meters wide"
```
AI rebuilds arena at 80m.

```
"Add more weapons - rocket launcher in center, shotguns at sides"
```
AI places weapons strategically.

```
"Add 10 enemies around the edges"
```
AI spawns imps in tactical positions with patrol behaviors.

### Step 3: Adjust Lighting (1 minute)

```
"Make it darker and more red"
```
AI adjusts ambient to #220000, increases red directional intensity.

```
"Add flickering torches on the walls"
```
AI places 8 wall torches with point lights and fire particles.

### Step 4: Test It! (1 minute)

1. Click **▶️ Play Test** in toolbar
2. Level loads in FPS mode
3. Use **WASD** to move, **Mouse** to look, **Click** to shoot
4. Press **Esc** to return to editor

### Step 5: Export

1. Click **📦 Compile**
2. Choose **ASX JSON** format
3. Click **Export**
4. Your level is saved!

**Congratulations!** You just built a complete DOOM level in 5 minutes using AI.

---

<a name="ai-basics"></a>
## 5. Using the AI Assistant

### How It Works

The AI Assistant uses **Ollama** (llama3.1:7b) to understand natural language and translate it into precise ASX JSON commands.

### Starting a Conversation

Click **🤖 AI Assistant** to open the chat panel.

**Basic Pattern:**
```
You: [describe what you want]
AI: [builds it and shows result]
```

### AI Understands Context

The AI remembers your conversation and scene state:

```
You: Create a platform 20x20
AI: ✓ Created platform

You: Add walls around it
AI: ✓ Added walls (knows which platform)

You: Make them taller
AI: ✓ Increased wall height (remembers the walls)

You: Add a door on the north side
AI: ✓ Added door (understands orientation)
```

### AI Gives Suggestions

Ask for advice:

```
You: How should I place enemies for good gameplay?
AI: Recommendation: Use layered defense
    - 5 zombies in front (cannon fodder)
    - 3 imps on sides (ranged threat)
    - 1 demon behind (surprise attack)
    - Place health pickup between waves
```

---

<a name="ai-commands"></a>
## 6. Natural Language Commands

### Terrain Commands

**Creating:**
```
"Create a circular platform 50 meters wide"
"Make a rocky terrain 100x100"
"Generate hellscape ground with lava"
"Build a flat floor 200x200"
```

**Sculpting:**
```
"Raise the center 5 meters"
"Lower the edges to create a pit"
"Add hills and valleys"
"Smooth out this area"
```

**Texturing:**
```
"Paint the floor with stone texture"
"Add blood splatters"
"Make it look more hellish"
```

### NPC Commands

**Single Spawns:**
```
"Add an imp at x:10, z:20"
"Place a baron of hell in the center"
"Spawn 3 cacodemons above"
```

**Formations:**
```
"Add 5 imps in a circle around center"
"Place 10 zombies in a line"
"Scatter 8 demons randomly"
```

**Behaviors:**
```
"Make them patrol between waypoints"
"Set to ambush mode"
"Have them guard this area"
```

### Lighting Commands

**Global:**
```
"Make it darker"
"Set up hellscape lighting"
"Add dramatic red lighting"
```

**Specific Lights:**
```
"Add a point light here"
"Place flickering torches on walls"
"Create a spotlight on the altar"
```

**Effects:**
```
"Add volumetric fog"
"Make the lights flicker"
"Add god rays through windows"
```

### Architecture Commands

```
"Add walls around the perimeter"
"Create a door here"
"Build a stairway to the balcony"
"Place pillars every 10 meters"
```

### Item Commands

```
"Add shotgun pickups at the corners"
"Place health packs around the arena"
"Put a rocket launcher in the center"
"Scatter ammo throughout"
```

---

<a name="ai-examples"></a>
## 7. AI Command Examples

### Example 1: Quick Arena

**Goal:** Create a basic deathmatch arena

```
You: Create a square arena 60x60 meters

AI: ✓ Created square platform 60x60m

You: Add walls 5 meters high around the edges

AI: ✓ Added perimeter walls, height 5m

You: Put 8 player spawn points evenly distributed

AI: ✓ Added 8 spawns in grid pattern

You: Add weapons: shotgun at each corner, rocket launcher in center

AI: ✓ Placed 4 shotguns at corners
    ✓ Placed rocket launcher at center (0, 0, 0)

You: Make it look hellish

AI: ✓ Applied hellscape lighting (red ambient + directional)
    ✓ Added fire particles
    ✓ Set stone textures with blood overlays
```

**Time:** ~2 minutes
**Result:** Playable deathmatch arena

### Example 2: Enemy Encounter

**Goal:** Set up a challenging fight

```
You: I want to design a tough enemy encounter. 
     The player enters a room and gets ambushed.

AI: Recommendation for ambush encounter:
    1. Room size: 40x40m for mobility
    2. Initial enemies visible: 3-4 weak (imps/zombies)
    3. Ambush trigger: 2 demons from sides
    4. Boss phase: Baron appears after clearing adds
    Shall I build this?

You: Yes, build it

AI: ✓ Created encounter room 40x40m
    ✓ Placed 4 imps (visible patrol)
    ✓ Set up 2 demon closets (trigger on player_center)
    ✓ Added Baron spawn (trigger on add_clear)
    ✓ Placed health/ammo before encounter
    ✓ Added atmospheric lighting (dark with red accent)

You: Make the baron fight harder

AI: ✓ Increased baron health to 1500 (from 1000)
    ✓ Added phase system:
      - Phase 1: Ranged attacks
      - Phase 2 (50% HP): Spawns 4 imps
      - Phase 3 (25% HP): Berserk mode + speed boost
```

**Time:** ~5 minutes
**Result:** Professional encounter design

### Example 3: Atmospheric Scene

**Goal:** Create a spooky cathedral

```
You: Build a gothic cathedral interior

AI: ✓ Created cathedral layout (60x120m)
    ✓ Added vaulted ceiling (20m height)
    ✓ Placed gothic pillars
    ✓ Added rows of pews
    ✓ Built altar at end

You: Add stained glass windows

AI: ✓ Added 6 stained glass windows
    ✓ Set colored light casting (red, blue, purple)

You: Make it creepy - like it's corrupted

AI: ✓ Added blood splatters on floor
    ✓ Destroyed/toppled some pews
    ✓ Set dark purple ambient lighting
    ✓ Added flickering candles
    ✓ Applied cracked/bloody textures to altar
    ✓ Added ominous fog
    ✓ Placed demonic particles at altar

You: Add zombies lurking in the shadows

AI: ✓ Spawned 6 zombies in dark corners
    ✓ Set behavior: idle until player approaches
    ✓ Added groaning ambient sounds
```

**Time:** ~7 minutes
**Result:** Immersive horror environment

---

<a name="ai-modes"></a>
## 8. AI Modes: Builder, Designer, Technical

The AI has **three specialized modes** for different tasks.

### Builder Mode (Default)
**Use for:** Actual construction commands

**Characteristics:**
- Precise, technical responses
- Outputs executable JSON
- Focuses on exact coordinates and values
- Best for: "Build this specific thing"

**Example:**
```
You: Create a platform 50x50 at height 10

AI: {
  "command": "terrain.create",
  "type": "platform",
  "size": {"width": 50, "depth": 50},
  "position": {"x": 0, "y": 10, "z": 0},
  "texture": "stone_floor"
}
```

### Designer Mode
**Use for:** Creative suggestions and gameplay advice

**Characteristics:**
- Creative, strategic thinking
- Suggests layouts and placements
- Focuses on fun and balance
- Best for: "How should I design this?"

**Example:**
```
You: How should I lay out this boss fight?

AI: {
  "recommendation": "boss_arena_layout",
  "strategy": "Three-phase encounter with cover and power-ups",
  "layout": {
    "arena_size": "80x80m circular",
    "cover": "4 pillars at cardinal points",
    "power_ups": [
      {"type": "megahealth", "position": "center", "timing": "phase_2"},
      {"type": "quad_damage", "position": "hidden_alcove", "timing": "phase_3"}
    ]
  },
  "enemy_phases": [
    {"health": "100-50%", "behavior": "ranged", "adds": "none"},
    {"health": "50-25%", "behavior": "mixed", "adds": "4 imps"},
    {"health": "25-0%", "behavior": "berserk", "adds": "2 demons"}
  ]
}
```

### Technical Mode
**Use for:** Optimization and performance

**Characteristics:**
- Analytical, data-focused
- Identifies performance issues
- Suggests optimizations
- Best for: "Why is this slow?" or "How do I optimize?"

**Example:**
```
You: My level is running at 20 FPS, help!

AI: {
  "analysis": "performance_check",
  "findings": [
    {
      "issue": "excessive_draw_calls",
      "current": 450,
      "target": 150,
      "impact": "major"
    },
    {
      "issue": "too_many_lights",
      "current": 50,
      "target": 10,
      "impact": "major"
    },
    {
      "issue": "high_polygon_meshes",
      "current": "2M tris",
      "target": "500K tris",
      "impact": "moderate"
    }
  ],
  "solutions": [
    {"action": "merge_static_meshes", "expected_gain": "+15 FPS"},
    {"action": "reduce_point_lights", "expected_gain": "+10 FPS"},
    {"action": "add_lod_levels", "expected_gain": "+8 FPS"}
  ]
}
```

### Switching Modes

In AI Assistant panel, select mode from dropdown:
- **Builder Mode** (default)
- **Designer Mode**
- **Technical Mode**

Or say:
```
"Switch to designer mode"
"I need technical advice"
"Back to builder mode"
```

---

<a name="templates"></a>
## 9. Working with Templates

### Why Use Templates?

Templates give you **professionally designed starting points**:

✅ **Save Time** - Hours of work in seconds
✅ **Learn Patterns** - See how pros structure levels
✅ **Customize** - Modify to your needs
✅ **Quality** - Tested and balanced

### Loading a Template

1. Click **📦 Templates** in toolbar
2. Browse categories:
   - 🏟️ **Arenas** - Deathmatch maps
   - 📖 **Campaigns** - Story levels
   - 🌋 **Environments** - Terrain presets
   - ⚙️ **Mechanics** - Gameplay systems

3. Click template thumbnail
4. Preview loads on right
5. Click **Load Template**

### What You Get

Every template includes:
- **Terrain** - Geometry and textures
- **Architecture** - Walls, doors, platforms
- **Spawns** - Player start points
- **Items** - Weapons, health, ammo
- **Lighting** - Complete lighting setup
- **Particles** - Atmosphere effects
- **Audio** - Ambient sounds and music

### Customizing Templates

After loading, use AI to modify:

```
"Make the arena twice as big"
"Add more enemies"
"Change lighting to blue tech theme"
"Remove the center platform"
```

Or manually edit in Inspector panel.

### Creating Template Variants

Save your modifications as new templates:

1. Make changes to loaded template
2. Click **📦 Compile → Save As Template**
3. Name it (e.g., "Circular Arena XL")
4. Add description and thumbnail
5. Now it appears in your template library

---

<a name="terrain-basics"></a>
## 13. Terrain Sculpting Basics

### Terrain Tools Overview

Click **⛰️ Terrain Tools** to access:

**1. Sculpting Brushes**
- **Raise** ⬆️ - Lift terrain up
- **Lower** ⬇️ - Push terrain down
- **Flatten** ▬ - Level to consistent height
- **Smooth** 〰️ - Soften edges
- **Noise** 📊 - Add randomness

**2. Painting**
- Layer multiple textures
- Blend between materials
- Paint decals (blood, scorch marks)

**3. Procedural Generation**
- Perlin noise (natural hills)
- Voronoi (rocky/cell patterns)
- Erosion simulation

### Basic Sculpting Workflow

**Step 1: Create Base Terrain**

```
AI: "Create a 200x200 meter terrain"
```

Or manually:
- Click **⛰️ Terrain Tools**
- Select **Create New**
- Set size: 200x200
- Set resolution: 128x128 (higher = more detail)
- Click **Generate**

**Step 2: Sculpt Basic Shape**

Select **Raise Brush**:
- **Strength:** 1.0 (how much to raise)
- **Radius:** 20 (brush size)
- **Falloff:** Smooth

Click and drag on terrain in viewport to raise hills.

Select **Lower Brush** to carve valleys or pits.

**Step 3: Add Details**

Select **Noise Brush**:
- **Strength:** 0.3 (subtle)
- **Radius:** 10
- **Scale:** 5 (detail frequency)

Paint over smooth areas to add rocky texture.

**Step 4: Smooth Edges**

Select **Smooth Brush**:
- **Strength:** 0.5
- **Radius:** 15

Smooth harsh transitions for natural look.

### Pro Tips

💡 **Use Reference Height**
- Set a target height guide
- Flatten brush makes matching easy

💡 **Layer Your Details**
- Large features first (mountains, valleys)
- Medium details next (hills, slopes)
- Small details last (rocks, bumps)

💡 **Test in Play Mode**
- Movement should feel good
- No inaccessible steep slopes
- Strategic high ground positions

---

<a name="npc-spawning"></a>
## 17. Spawning Enemies

### Quick Spawn Methods

**Method 1: AI Command (Fastest)**
```
"Add 5 imps in a circle around the center"
"Place a baron of hell at x:0, z:50"
"Scatter 10 zombies randomly"
```

**Method 2: Manual Placement**
1. Click **👹 NPC Spawner**
2. Select enemy type (imp, demon, etc.)
3. Click in viewport to place
4. Adjust in Inspector

**Method 3: Formations**
1. Click **👹 NPC Spawner → Formation Tool**
2. Choose pattern: Line, Circle, Grid, Arc
3. Set count and spacing
4. Click center point in viewport

### Enemy Types

**Tier 1: Cannon Fodder**
- **Zombie** - Slow, weak, melee only
  - Health: 20, Damage: 5
  - Use for: Easy starts, fodder waves
  
- **Imp** - Fast, ranged fireballs
  - Health: 60, Damage: 10
  - Use for: Harassment, sniper positions

**Tier 2: Mid-Level Threats**
- **Demon** - Fast melee, charging attack
  - Health: 150, Damage: 20
  - Use for: Ambushes, pressure

- **Cacodemon** - Flying, ranged
  - Health: 400, Damage: 15
  - Use for: Aerial combat, cover denial

**Tier 3: Bosses**
- **Baron of Hell** - Tank, dual fireballs
  - Health: 1000, Damage: 40
  - Use for: Boss fights, guardians

- **Cyberdemon** - Ultimate boss
  - Health: 4000, Damage: 100
  - Use for: Final encounters

---

<a name="ai-behavior"></a>
## 18. AI Behavior with Ollama

### How NPC AI Works

Each enemy has an **Ollama-powered AI** that controls behavior.

**Traditional AI:**
```javascript
if (playerDistance < 20) {
  attack();
} else {
  patrol();
}
```

**Ollama AI:**
```javascript
context = getContext(); // player position, health, etc.
decision = ollama.ask("You are an imp. Player is nearby. What do you do?");
executeDecision(decision);
```

### Behavior Presets

**Patrol:**
```
Prompt: "You are patrolling demon. Walk between waypoints. 
Attack player if seen within 20m. Return if player escapes."
Temperature: 0.5 (consistent)
```

**Guard:**
```
Prompt: "You are guard demon. Stay at post. Attack if player 
within 15m. Pursue briefly then return."
Temperature: 0.3 (defensive)
```

**Hunt:**
```
Prompt: "You are hunter demon. Actively seek player. 
Use pathfinding. Never give up. Smart positioning."
Temperature: 0.7 (aggressive)
```

**Ambush:**
```
Prompt: "You are ambush demon. Hide until player enters 
trigger. Then attack with surprise."
Temperature: 0.6 (tactical)
```

### Custom Behaviors

Create your own:

1. Select enemy in scene
2. Inspector → **AI Behavior**
3. Choose **Custom**
4. Write Ollama prompt:

```
You are a cowardly imp. You prefer to stay at range.
If player gets close, you retreat while throwing fireballs.
If health drops below 50%, you flee to nearest cover.
You call for help from nearby allies.
```

5. Set temperature (0.0-1.0)
   - **Low (0.2-0.4)** - Predictable, consistent
   - **Medium (0.5-0.7)** - Balanced, some variation
   - **High (0.8-1.0)** - Chaotic, unpredictable

### Boss AI

For boss fights, use multi-phase prompts:

```
Phase 1 (100-50% HP):
You are Baron boss. Stay at range. Throw dual fireballs.
Strafe to avoid rockets. Confident and taunting.

Phase 2 (50-25% HP):
You are Baron boss, wounded. More aggressive now.
Mix melee claw attacks with fireballs. Summon 4 imp adds.
Start dodging more actively.

Phase 3 (25-0% HP):
You are Baron boss, desperate. Pure aggression.
Charge player with melee. Spam fireballs frantically.
Ignore damage, go berserk. Summon 2 demon adds.
```

AI switches prompts when health thresholds reached.

---

This manual continues with all 30 chapters covering every aspect of the construction set. Each section has:
- Clear explanations
- Practical examples
- Pro tips
- Screenshots (would be included in final version)
- Step-by-step tutorials

---

<a name="shortcuts"></a>
## Keyboard Shortcuts Reference

### General
- `Ctrl + S` - Save level
- `Ctrl + Z` - Undo
- `Ctrl + Y` - Redo
- `Ctrl + D` - Duplicate selected
- `Delete` - Delete selected
- `F1` - Toggle manual
- `~` (tilde) - Toggle AI console

### Viewport
- `W/A/S/D` - Fly camera
- `Q/E` - Up/Down
- `Shift` - Fast movement
- `Alt + Click` - Select object
- `F` - Focus on selected
- `G` - Toggle grid
- `L` - Toggle lighting preview

### Tools
- `T` - Terrain tools
- `N` - NPC spawner
- `I` - Item placer
- `P` - Play test mode
- `Esc` - Exit play test

### Quick Commands
- `Ctrl + T` - New template
- `Ctrl + E` - Export
- `Ctrl + P` - Compile
- `Ctrl + Space` - AI quick command

---

**End of Manual Preview**

*The full manual contains 30 chapters with comprehensive coverage of every feature in the ASX DOOM Construction Set.*
