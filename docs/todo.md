# TODO

## Immediate cleanup
- Consolidate duplicate HTML demos into a single runnable entry point.
- Normalize asset naming (logos, splash art) and document their usage.
- Trim unused prototype files once confirmed redundant.

## Engine & gameplay
- Expand the runtime to load additional maps beyond `world/maps/hellscape.json`.
- Add basic enemy AI and combat feedback loops.
- Implement save/load for player state and runtime settings.

## Tooling
- Add scripts for local development (serve + watch).
- Introduce linting/formatting for JS/HTML/CSS.
- Capture a minimal test plan for the runtime and server.

## Server & operations
- Document JSON server lifecycle and WebSocket events.
- Add sample data fixtures under `data/` for local testing.
- Add basic health checks/logging configuration.
