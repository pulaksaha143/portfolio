# Pulak Saha Portfolio

<div align="center">
  <p><strong>Where stillness reveals the unseen.</strong></p>
  <p>A curated archive of machine learning systems, diagnostic architectures, and core software foundations by Pulak Saha.</p>

  [![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg?style=flat&logo=vite)](#)
  [![Three.js](https://img.shields.io/badge/Three.js-WebGL-black.svg?style=flat&logo=three.js)](#)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](#)
</div>

---

## Visual & Spatial Concept

**This portfolio** represents a five-chapter night walk through a Kyoto mountain temple—abstracted into a modern, highly optimized technical portfolio. Blending deep learning and high-performance data engineering with high-fidelity web aesthetics, the experience hinges on spatial depth, ambient lighting, and absolute stillness.

It leverages custom WebGL rendering (via Three.js) to display elements like charred cypress (*Yakisugi*), lantern light, and a vermilion moon. The design philosophy is minimalist and intent-driven: no rushed hacks or buzzwords, just patient, scalable architecture that holds its weight under pressure.

## Architectural Breakdown

The application is structured into four primary chapters, each tied to a specific functional zone and thematic Kanji:

| Chapter | Kanji | Translation | Purpose | Description |
| :--- | :---: | :--- | :--- | :--- |
| **01 — The Architect** | 山門 | *Sanmon* (The Gate) | **About Me** | An introduction to the author—deep curiosity, late nights, and a mind wired to build robust systems. |
| **02 — The Workspace** | 庭園 | *Teien* (Garden) | **Projects** | Showcase of core machine learning and data engineering projects. |
| **03 — The Hand And Word** | 手業 | *Tewaza* (Craft) | **Cert & Connect** | Validated competencies (Gemini Certified Educator, MS SQL) and open communication lines. |
| **04 — The Hall of Study** | 学堂 | *Gakudō* (Study) | **Education** | Academic background at PW Institute of Innovation and Medhavi Skills University (2025–2029). |

## Technical Implementation

The site is a single, hand-authored HTML document served directly by **Vite** — no framework layer sits between the browser and the experience.

- **Rendering Pipeline & Canvas:**
  - Real-time 3D composition utilizing **Three.js**.
  - Procedural shader effects (bloom, film grain, chromatic aberration) and custom geometry render the entire temple environment — all textures are generated at runtime; none are downloaded for the GL scene.
  - Adaptive resolution governor, clamped device-pixel ratio, frozen shadow maps, and IntersectionObserver-gated secondary simulations keep the frame budget honest.
  - WebGL context loss degrades gracefully to a static CSS fallback scene.
- **Animation & Scroll Interpolation:**
  - Ultra-smooth scroll via **Lenis**, integrated with the native `requestAnimationFrame` loop.
  - Camera transitions (`data-cam`), scroll-reveal triggers (`data-rv`), and spatial text splitting run in parallel to the WebGL draw calls.
- **Accessibility & Resilience:**
  - Skip-link, `:focus-visible` styles, focus-managed mobile menu, `prefers-reduced-motion` support throughout, and a `<noscript>` content fallback.
  - SEO essentials included: Open Graph / Twitter cards, canonical URL, and JSON-LD structured data.
- **Performance Considerations:**
  - Self-hosted WOFF2 fonts with `font-display: swap` and preloaded critical faces.
  - Compressed WebP scenery (~1.5 MB total) served locally — fully offline-capable, zero third-party requests.

## Directory Structure

```text
pulaksaha143/portfolio/
├── .github/workflows/          # CI build check + GitHub Pages deploy
├── index.html                  # The entire site — markup, CSS, and WebGL application
├── package.json
├── vite.config.ts              # Vite configuration (base path for Pages)
├── public/
│   └── assets/
│       ├── fonts.css           # @font-face declarations
│       ├── fonts/              # Self-hosted WOFF2 faces
│       ├── three.min.js        # Localized Three.js build
│       ├── lenis.min.js        # Localized Lenis smooth scroll
│       ├── social-card.jpg     # Open Graph preview card
│       ├── foreground/         # Alpha-plane scenery layers (WebP)
│       └── generated/          # Pre-rendered environment maps
└── NOTIMP/                     # Local-only scratch files (untracked)
```

## Local Development

To spin up the project locally for development or preview:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pulaksaha143/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local Vite dev server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```
   *Note: This generates highly optimized static assets in the `/dist` directory.*

## Author & Channels

| Platform / Project | Link |
| :--- | :--- |
| **Email** | [pulaksaha802@gmail.com](mailto:pulaksaha802@gmail.com) |
| **GitHub** | [@pulaksaha143](https://github.com/pulaksaha143) |
| **LinkedIn** | [Pulak Saha](https://www.linkedin.com/in/pulak-saha-8a5836362/) |
| **Project: Wingman** | [Repository ↗](https://github.com/pulaksaha143/wingman) |
| **Project: CerebroVision** | [Repository ↗](https://github.com/pulaksaha143/cerebrovision) |
| **Project: Netflix Recom Engine** | [Repository ↗](https://github.com/pulaksaha143/netflix-recommendation-system) |

## License & Attribution

- **License:** Released under the [MIT License](LICENSE).
- **Core Technology:** [Vite](https://vitejs.dev/) serving a hand-authored HTML document.
- **Graphics & Motion:** Powered by [Three.js](https://threejs.org/) and [Lenis Smooth Scroll](https://github.com/darkroomengineering/lenis).
