/**
 * ASX DOOM Construction Set - AI Assistant Engine
 * Powered by Ollama (llama3.1:7b)
 * 
 * Natural language world building:
 * - "Create a hellscape arena with lava moat"
 * - "Add 5 imp spawners in circular pattern"
 * - "Set up dramatic red lighting with flickering torches"
 * 
 * Author: Michael - ASX Interactive Systems
 */

class ASXConstructionAI {
  constructor() {
    this.ollamaEndpoint = 'http://localhost:11434/api/generate';
    this.model = 'llama3.1:7b';
    this.conversationHistory = [];
    this.currentScene = null;
    
    // System prompts for different modes
    this.modes = {
      builder: {
        name: "Builder Mode",
        system: `You are an expert DOOM level designer AI assistant for the ASX Construction Set.

Your job is to translate natural language requests into precise ASX JSON structures.

CRITICAL RULES:
1. ALWAYS output valid JSON only
2. Use exact coordinate systems (x, y, z in meters)
3. Reference only assets that exist in the asset browser
4. Consider gameplay balance and flow
5. Be precise with numbers and measurements

AVAILABLE ASSET TYPES:
- Terrain: heightmap, flat, procedural
- Enemies: zombie, imp, demon, cacodemon, baron, cyberdemon
- Weapons: pistol, shotgun, chaingun, rocket_launcher, bfg
- Items: health_small, health_large, armor, ammo_*
- Architecture: wall_*, door_*, platform_*
- Lights: ambient, directional, point, spot

COORDINATE SYSTEM:
- X/Z = horizontal plane (ground)
- Y = vertical (height)
- 1 unit = 1 meter
- Player height = 1.8m

EXAMPLE INTERACTIONS:

User: "Create a circular arena 50 meters wide"
You: {
  "command": "terrain.create",
  "type": "circular_platform",
  "radius": 25,
  "position": {"x": 0, "y": 0, "z": 0},
  "texture": "stone_floor",
  "height": 0.5
}

User: "Add 5 imps in a circle around the center"
You: {
  "command": "npc.spawn_formation",
  "type": "imp",
  "formation": "circle",
  "count": 5,
  "radius": 15,
  "center": {"x": 0, "y": 0, "z": 0},
  "behavior": "patrol"
}

User: "Make it look hellish with red lighting"
You: {
  "commands": [
    {
      "command": "light.ambient",
      "color": "#330000",
      "intensity": 0.3
    },
    {
      "command": "light.directional",
      "color": "#ff0000",
      "intensity": 0.7,
      "position": {"x": 0, "y": 50, "z": 0}
    },
    {
      "command": "particles.add",
      "type": "embers",
      "area": {"radius": 30}
    }
  ]
}

ALWAYS respond with executable JSON. Never explain in prose.`,
        temperature: 0.7
      },
      
      designer: {
        name: "Designer Mode",
        system: `You are a creative game designer AI specializing in DOOM-style gameplay.

Your job is to suggest interesting layouts, enemy placements, and gameplay flow.

Focus on:
- Fun factor and player engagement
- Balanced difficulty curves
- Strategic weapon/item placement
- Secrets and exploration rewards
- Flow and pacing

When user asks for design advice, provide JSON with recommendations.

Example:
User: "How should I lay out enemies for this arena?"
You: {
  "recommendation": "arena_enemy_layout",
  "strategy": "Use concentric circles - weak enemies (imps/zombies) in outer ring, mid-tier (demons) in middle, boss (baron) at center",
  "placements": [
    {
      "tier": "cannon_fodder",
      "types": ["zombie", "imp"],
      "count": 10,
      "formation": "outer_ring",
      "radius": 40
    },
    {
      "tier": "mid_level",
      "types": ["demon"],
      "count": 4,
      "formation": "cardinal_points",
      "radius": 20
    },
    {
      "tier": "boss",
      "types": ["baron"],
      "count": 1,
      "position": "center"
    }
  ],
  "weapon_suggestions": [
    {"type": "shotgun", "reason": "Good for crowds", "position": "spawn"},
    {"type": "rocket_launcher", "reason": "Boss damage", "position": "arena_side"}
  ]
}`,
        temperature: 0.9
      },
      
      technical: {
        name: "Technical Mode",
        system: `You are a technical artist AI focused on optimization and performance.

Your job is to ensure levels run smoothly while looking great.

Consider:
- Draw calls and mesh batching
- LOD (Level of Detail) strategies
- Shadow map resolution
- Particle system budgets
- Occlusion culling
- Texture memory

Provide JSON with optimization recommendations.

Example:
User: "Why is my level running slow?"
You: {
  "analysis": "performance_check",
  "findings": [
    {
      "issue": "high_draw_calls",
      "count": 450,
      "recommended": 150,
      "solution": "merge_static_meshes"
    },
    {
      "issue": "shadow_casters",
      "count": 50,
      "recommended": 10,
      "solution": "reduce_point_lights"
    }
  ],
  "optimizations": [
    {
      "command": "optimize.merge_meshes",
      "target": "static_geometry",
      "expected_gain": "60% draw call reduction"
    },
    {
      "command": "optimize.lod",
      "distances": [10, 25, 50],
      "expected_gain": "30% polygon reduction"
    }
  ]
}`,
        temperature: 0.3
      }
    };
    
    this.currentMode = 'builder';
  }
  
  /**
   * Send command to AI assistant
   */
  async send(userMessage, context = {}) {
    this.conversationHistory.push({
      role: 'user',
      content: userMessage
    });
    
    const fullPrompt = this.buildPrompt(userMessage, context);
    
    try {
      const response = await fetch(this.ollamaEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.model,
          prompt: fullPrompt,
          stream: false,
          temperature: this.modes[this.currentMode].temperature
        })
      });
      
      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }
      
      const data = await response.json();
      const aiResponse = data.response;
      
      this.conversationHistory.push({
        role: 'assistant',
        content: aiResponse
      });
      
      // Parse JSON from AI response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const commandJSON = JSON.parse(jsonMatch[0]);
        return {
          success: true,
          json: commandJSON,
          raw: aiResponse
        };
      } else {
        return {
          success: false,
          error: 'AI did not return valid JSON',
          raw: aiResponse
        };
      }
      
    } catch (error) {
      console.error('AI Assistant error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  /**
   * Build full prompt with context
   */
  buildPrompt(userMessage, context) {
    const modeConfig = this.modes[this.currentMode];
    
    let prompt = modeConfig.system + '\n\n';
    
    // Add scene context
    if (context.scene) {
      prompt += `CURRENT SCENE CONTEXT:\n`;
      prompt += `- Terrain size: ${context.scene.terrain?.size || 'none'}\n`;
      prompt += `- Enemies: ${context.scene.enemies?.length || 0}\n`;
      prompt += `- Lights: ${context.scene.lights?.length || 0}\n`;
      prompt += `- Player spawns: ${context.scene.spawns?.length || 0}\n\n`;
    }
    
    // Add recent conversation history (last 3 exchanges)
    const recentHistory = this.conversationHistory.slice(-6);
    if (recentHistory.length > 0) {
      prompt += 'RECENT CONVERSATION:\n';
      recentHistory.forEach(msg => {
        prompt += `${msg.role}: ${msg.content}\n`;
      });
      prompt += '\n';
    }
    
    prompt += `USER REQUEST: ${userMessage}\n\n`;
    prompt += 'AI RESPONSE (JSON ONLY):';
    
    return prompt;
  }
  
  /**
   * Execute AI-generated command
   */
  async execute(commandJSON) {
    const commands = Array.isArray(commandJSON.commands) ? 
      commandJSON.commands : [commandJSON];
    
    const results = [];
    
    for (const cmd of commands) {
      const result = await this.executeCommand(cmd);
      results.push(result);
    }
    
    return results;
  }
  
  /**
   * Execute single command
   */
  async executeCommand(cmd) {
    const [category, action] = cmd.command.split('.');
    
    switch (category) {
      case 'terrain':
        return this.executeTerrain(action, cmd);
      case 'npc':
        return this.executeNPC(action, cmd);
      case 'light':
        return this.executeLight(action, cmd);
      case 'particles':
        return this.executeParticles(action, cmd);
      case 'architecture':
        return this.executeArchitecture(action, cmd);
      case 'optimize':
        return this.executeOptimize(action, cmd);
      default:
        return { success: false, error: `Unknown command category: ${category}` };
    }
  }
  
  /**
   * Terrain commands
   */
  executeTerrain(action, cmd) {
    console.log(`[AI] Executing terrain.${action}`, cmd);
    
    switch (action) {
      case 'create':
        window.ASXConstructor.terrain.create(cmd);
        break;
      case 'sculpt':
        window.ASXConstructor.terrain.sculpt(cmd);
        break;
      case 'paint':
        window.ASXConstructor.terrain.paint(cmd);
        break;
      default:
        return { success: false, error: `Unknown terrain action: ${action}` };
    }
    
    return { success: true, command: cmd.command };
  }
  
  /**
   * NPC commands
   */
  executeNPC(action, cmd) {
    console.log(`[AI] Executing npc.${action}`, cmd);
    
    switch (action) {
      case 'spawn':
        window.ASXConstructor.npc.spawn(cmd);
        break;
      case 'spawn_formation':
        window.ASXConstructor.npc.spawnFormation(cmd);
        break;
      case 'set_behavior':
        window.ASXConstructor.npc.setBehavior(cmd);
        break;
      default:
        return { success: false, error: `Unknown NPC action: ${action}` };
    }
    
    return { success: true, command: cmd.command };
  }
  
  /**
   * Lighting commands
   */
  executeLight(action, cmd) {
    console.log(`[AI] Executing light.${action}`, cmd);
    
    switch (action) {
      case 'ambient':
        window.ASXConstructor.lighting.setAmbient(cmd);
        break;
      case 'directional':
        window.ASXConstructor.lighting.addDirectional(cmd);
        break;
      case 'point':
        window.ASXConstructor.lighting.addPoint(cmd);
        break;
      case 'spot':
        window.ASXConstructor.lighting.addSpot(cmd);
        break;
      default:
        return { success: false, error: `Unknown light action: ${action}` };
    }
    
    return { success: true, command: cmd.command };
  }
  
  /**
   * Particle commands
   */
  executeParticles(action, cmd) {
    console.log(`[AI] Executing particles.${action}`, cmd);
    
    switch (action) {
      case 'add':
        window.ASXConstructor.particles.add(cmd);
        break;
      default:
        return { success: false, error: `Unknown particles action: ${action}` };
    }
    
    return { success: true, command: cmd.command };
  }
  
  /**
   * Architecture commands
   */
  executeArchitecture(action, cmd) {
    console.log(`[AI] Executing architecture.${action}`, cmd);
    
    switch (action) {
      case 'add_wall':
        window.ASXConstructor.architecture.addWall(cmd);
        break;
      case 'add_door':
        window.ASXConstructor.architecture.addDoor(cmd);
        break;
      case 'add_platform':
        window.ASXConstructor.architecture.addPlatform(cmd);
        break;
      default:
        return { success: false, error: `Unknown architecture action: ${action}` };
    }
    
    return { success: true, command: cmd.command };
  }
  
  /**
   * Optimization commands
   */
  executeOptimize(action, cmd) {
    console.log(`[AI] Executing optimize.${action}`, cmd);
    
    switch (action) {
      case 'merge_meshes':
        window.ASXConstructor.optimize.mergeMeshes(cmd);
        break;
      case 'lod':
        window.ASXConstructor.optimize.generateLOD(cmd);
        break;
      default:
        return { success: false, error: `Unknown optimize action: ${action}` };
    }
    
    return { success: true, command: cmd.command };
  }
  
  /**
   * Change AI mode
   */
  setMode(mode) {
    if (this.modes[mode]) {
      this.currentMode = mode;
      console.log(`[AI] Switched to ${this.modes[mode].name}`);
      return true;
    }
    return false;
  }
  
  /**
   * Get quick action command
   */
  getQuickAction(actionName) {
    const actions = {
      'arena': 'Create a deathmatch arena 100x100 units with 4 weapon spawns at corners and 8 player starts distributed evenly',
      'enemy_wave': 'Add 10 enemies: 5 imps in outer ring, 3 demons in mid ring, 2 cacodemons flying above center',
      'terrain': 'Generate rocky hellscape terrain 200x200 with realistic erosion and lava rivers flowing from corners to center',
      'lighting': 'Set up hellscape lighting: dark red ambient at 0.3 intensity, red directional from above at 0.7, add flickering point lights and ember particles',
      'objectives': 'Place 3 colored key cards (red, blue, yellow) in hidden locations and corresponding locked doors leading to exit',
      'cathedral': 'Build gothic cathedral interior: vaulted ceiling 20m high, stained glass windows with red light, stone pillars, blood-stained floor'
    };
    
    return actions[actionName] || null;
  }
  
  /**
   * Get scene context for AI
   */
  getSceneContext() {
    if (!window.ASXConstructor?.scene) return {};
    
    const scene = window.ASXConstructor.scene;
    
    return {
      terrain: scene.terrain,
      enemies: scene.children.filter(obj => obj.userData?.type === 'enemy'),
      lights: scene.children.filter(obj => obj.isLight),
      spawns: scene.children.filter(obj => obj.userData?.type === 'spawn'),
      architecture: scene.children.filter(obj => obj.userData?.type === 'architecture')
    };
  }
}

// Export for use in ASX runtime
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ASXConstructionAI;
}
