# ASX DOOM WORLD

A prototype game/runtime sandbox that combines a DOOM-inspired FPS loop with an ASX JSON data layer.

## Current state (what it is today)
- A browser-based demo (`index.html`) that boots a Three.js scene and a playable FPS controller.
- A lightweight runtime core under `engine/` with input, HUD, OS loading, and scene wiring.
- A single sample map at `world/maps/hellscape.json` and an OS config in `os/os.json`.
- A Node-based JSON server (`server.js`) with WebSocket support for managing data instances.
- Multiple HTML prototypes and UI experiments in the repository root.

## What is missing
- A single, canonical entry point (multiple demo HTML files exist).
- A consistent content pipeline for maps, assets, and gameplay data.
- Basic AI, enemy spawning, and combat feedback loops beyond the demo scaffold.
- Build, lint, and test automation for the runtime and the server.
- Clear separation between prototype assets and production-ready assets.

## Repository layout (high level)
- `index.html` and related HTML demos: runtime prototypes.
- `engine/`: core runtime modules.
- `world/`: game data (currently a single map).
- `os/`: OS configuration data.
- `server.js` + `config.json`: JSON server and WebSocket entry point.
- `docs/`: consolidated documentation.

## Consolidated legacy notes
- The "Model Builder" prototype docs have been consolidated here; key entry points are `chat.html`, `simple-threejs-demo.html`, `debug-threejs-asx.html`, and `threejs-asx-fantasy-scene.html`.
- The JSON server prototype references OAuth and file upload ideas, but those are not wired into the current `server.js` runtime.

## Where it is going (potential phases)
1. **Phase 1 — Demo consolidation**
   - Pick a single runtime entry point and remove duplicate demos.
   - Document the minimum steps to run the demo locally.
2. **Phase 2 — Content pipeline**
   - Formalize map, entity, and asset schemas.
   - Add tooling for validating and previewing content changes.
3. **Phase 3 — Gameplay loop**
   - Add enemy spawning, basic AI, and combat progression.
   - Implement save/load and tuning hooks for gameplay balance.
4. **Phase 4 — Live operations**
   - Expand the JSON server to support sessions, events, and persistence.
   - Add monitoring, health checks, and deployment packaging.

## Notes
- All documentation is located in `docs/`.
- `docs/todo.md` tracks cleanup and next steps.
- Image assets are stored in `assets/`.
