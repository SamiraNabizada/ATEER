# ATEER — Perfume Website

A vanilla HTML/CSS/JavaScript perfume website starter using Three.js (no React).

## Requirements
- Node.js 20.19+ or 22.12+
- VS Code (recommended)

## Run locally
1. Open this folder in VS Code.
2. Open Terminal → New Terminal.
3. Run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL shown in the terminal (usually http://localhost:5173).

## Project structure
- `index.html` — page content and sections
- `src/style.css` — layout, colors, responsive design and strong golden cursor spotlight
- `src/main.js` — Three.js scene, procedural perfume bottle, lights, particles and mouse interaction
- `package.json` — project dependencies and scripts

The bottle is currently created from Three.js geometry, so the project works without downloading a GLB model. Later, you can replace it with a professionally modelled `.glb` perfume bottle.
