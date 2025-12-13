# Neon 3D Portfolio

Three.js-based, FPS-style portfolio that runs on GitHub Pages with ESM modules and CDN imports.

## Features
- Pointer lock controls (click to lock, WASD + mouse look).
- Raycast HUD: crosshair-driven info panel for project nodes.
- Portal between two rooms; shows `Press E to enter` when close.
- Cyberpunk HUD and crosshair overlay; WebGL fallback banner if context creation fails.
- Modular structure (`engine/`, `world/`, `ui/`) with relative ESM imports.

## Run locally
Serve the folder with any static server (relative paths only):
```sh
npx serve .
# or
python -m http.server 8080
```
Open `http://localhost:5000` (or your port). For GitHub Pages, push the folder to `main` and enable Pages.

## Controls
- Click canvas to lock pointer.
- Move: `W A S D`
- Look: mouse
- Interact: `E` near portal
- Aim at a project node to view details in the HUD.

Ensure hardware acceleration/WebGL is enabled; otherwise the overlay will show a warning.
