# Pulak Saha Portfolio

<div align="center">
  <p><strong>Where stillness reveals the unseen.</strong></p>
  <p>A curated archive of machine learning systems, diagnostic architectures, and core software foundations by Pulak Saha.</p>

  [![React](https://img.shields.io/badge/React-18.3-blue.svg?style=flat&logo=react)](#)
  [![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg?style=flat&logo=vite)](#)
  [![Three.js](https://img.shields.io/badge/Three.js-WebGL-black.svg?style=flat&logo=three.js)](#)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](#)
</div>

---

## Visual & Spatial Concept

**Kage (影)** represents a five-chapter night walk through a Kyoto mountain temple—abstracted into a modern, highly optimized technical portfolio. Blending deep learning and high-performance data engineering with high-fidelity web aesthetics, the experience hinges on spatial depth, ambient lighting, and absolute stillness. 

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

This project is built using a modern React architecture wrapping a highly bespoke, performance-focused HTML/WebGL document.

- **Rendering Pipeline & Canvas:** 
  - Real-time 3D composition utilizing **Three.js** (`three.min.js`).
  - Implements procedural shader effects, ambient post-processing (bloom, film grain), and custom geometry to render the temple environment.
- **Animation & Scroll Interpolation:** 
  - Ultra-smooth scroll hijacking implemented via **Lenis** (`lenis.min.js`), integrated seamlessly with the native `requestAnimationFrame` loop.
  - Camera transitions (`data-cam`), scroll-reveal triggers (`data-rv`), and spatial text splitting run in parallel to the WebGL draw calls.
- **Performance Considerations:**
  - **Zero External Dependencies:** All fonts, scripts, and high-resolution `.webp` image assets are stored and served locally to guarantee instant loading times and maximum privacy.
  - Efficient alpha-plane composition and optimized draw calls to maintain 60FPS even with complex visual post-processing.
- **Framework Integration:** 
  - Built on **Vite**, **TypeScript**, and **React 18**. The interactive `kage.html` canvas is framed seamlessly within the React lifecycle (`<KageLandingPage />`) via dynamic typography injection.

## Directory Structure

```text
pulaksaha143/portfolio/
├── .gitignore
├── index.html                     # Main application entry point
├── package.json
├── vite.config.ts                 # Vite bundler configuration
├── public/
│   └── landing-pages/
│       ├── kage.html              # The core WebGL/HTML landing experience
│       └── secret-pathways-assets/# 100% Local assets (WebP, CSS, JS)
│           ├── fonts.css
│           ├── lenis.min.js       # Localized Lenis smooth scroll
│           ├── three.min.js       # Localized Three.js build
│           ├── foreground/        # Alpha planes and scenery maps
│           └── generated/         # Pre-rendered environment maps
├── src/
│   ├── main.tsx                   # React bootstrapper
│   ├── App.tsx                    # Root component
│   └── effects/
│       └── kage-landing-page/     # React wrapper & customization logic
└── NOTIMP/                        # Excluded scratch files, raw backups, & PDFs
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
- **Core Technology:** [Vite](https://vitejs.dev/), [React](https://reactjs.org/), and [TypeScript](https://www.typescriptlang.org/).
- **Graphics & Motion:** Powered by [Three.js](https://threejs.org/) and [Lenis Smooth Scroll](https://github.com/darkroomengineering/lenis).
