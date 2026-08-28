# 🌐 John Nerzon Polintan — Ops Console & Portfolio

[![Live Site](https://img.shields.io/badge/Live_Site-nerzon.online-b8f04a?style=for-the-badge&logo=googlechrome&logoColor=0a0c0e)](https://nerzon.online/)
[![Profile](https://img.shields.io/badge/Cognitive_Profile-INTJ--A-b8f04a?style=for-the-badge&logo=speedtest&logoColor=0a0c0e)](https://nerzon.online/personality)
[![Status](https://img.shields.io/badge/System_Status-LIVE_%2F_ONLINE-brightgreen?style=for-the-badge&logo=statuspage&logoColor=white)](https://nerzon.online/)
[![Location](https://img.shields.io/badge/Base-Philippines_%C2%B7_GMT%2B8-151a20?style=for-the-badge&logo=googlemaps&logoColor=b8f04a)](https://nerzon.online/)

> **Personal portfolio and interactive operations console of John Nerzon Polintan.**  \n> Games & Config Specialist, IT Operations, and AI Workflow Automation specialist with 12+ years of experience spanning enterprise IT support and European iGaming release management.

---

## ⚡ Live Production URL

🚀 **[https://nerzon.online/](https://nerzon.online/)** — React single-page app (landing hub at `/`, full console at `/console`, INTJ-A report at `/personality`).
🧠 **[https://nerzon.online/personality](https://nerzon.online/personality)** *(INTJ-A Cognitive Diagnostic Report)*

---

## ✨ Features & Architecture

> The feature set below is delivered by the **React app** (`react-app/`), which is what ships to production. Every `git push` to `main` rebuilds and redeploys it automatically.

### 1. 🖥️ Cyberpunk Operations Console Aesthetic
* **Tailwind-free, hand-rolled dark palette**: Low-fatigue `#0a0c0e` carbon background with vibrant `#b8f04a` neon lime accents (theme tokens in `ThemeContext` + `global.css`).
* **Scroll Progress Bar & Terminal Scrambler**: Real-time reading progress bar with dynamic text decode animations on titles.
* **Pure Typography**: Self-hosted local web fonts (*Space Grotesk*, *Instrument Sans*, and *JetBrains Mono*) for 0ms layout shift.

### 2. 🕹️ Interactive Game Release Pipeline
* Interactive 6-stage operational pipeline (*Provider Intake → Configuration → Integration → Content QA → Live Deployment → Live Support*) with automated progression loops and hover previews.

### 3. 🧠 INTJ-A Cognitive Blueprint (`/personality`)
* Comprehensive diagnostic report benchmarking cognitive traits, communication protocols, energizers, and workflow drivers based on the official **16Personalities.com (NERIS Type Explorer®)** assessment.
* Dynamic animated trait percentage counters (51% Introverted, 71% Intuitive, 63% Thinking, 56% Judging, 65% Assertive).

### 4. ⌨️ Interactive Cyber Command Palette (`Ctrl+K` / `⌘K`)
* **Quick Access CLI**: Press `Ctrl+K`, `Cmd+K`, `/`, or click the `[⌘K]` badge to open a floating command palette with instant fuzzy search.
* **Keyboard Navigation**: Full arrow key (`↑`/`↓`), `Enter` execution, and `Escape` dismissal.
* **Command Catalog**: Direct jumps across sections, quick PDF download, INTJ-A report launcher, email copy, audio toggle, WhatsApp launcher, and a hidden `matrix` cyber rain burst Easter egg!

### 5. 🔊 Real-Time Synthesized Sound FX & Live Audio VU-Meter
* Zero-file, zero-latency audio engine generating retro-modern clicks and chimes directly via the browser's `AudioContext` (`services/audioEngine.ts`).
* **Animated Audio VU-Meter**: Equalizer visualizer in the header that pulses with synthesized audio.
* Full user control with header/footer mute switches (`SFX: ON / OFF`) and `localStorage` preference persistence.

### 6. 🌐 Reactive Cyber Grid Canvas & 3D Tilt Cards
* **Ambient Cyber Canvas**: High-performance background particle grid drifting and repelling around the cursor.
* **Radial Spotlight Glow**: Dynamic mouse-following radial lighting.
* **3D Parallax Tilt**: Smooth 3D card tilt physics across service, status, and diagnostic cards.

### 7. 📱 Quick Connect Mobile QR Matrix
* Built-in scannable QR widget linking to `https://nerzon.online/` with downloadable high-DPI badge assets.

### 8. 🤖 AI Engineering & Vibe Coding
* **AI Knowledge Agents**: Architecting dedicated AI assistants with custom knowledge bases connected to Airtable relational databases.
* **Modern AI Toolchain**: Power-user workflows across **Claude Code CLI**, **Google Antigravity IDE**, **Cursor IDE**, and **OpenAI Codex**.
* **Rapid Prototyping**: End-to-end full-stack web application development, prompt architecture, and automated API webhook pipelines.

### 9. 💼 Services & Engagements
* **Accepting Select Projects**: Available for freelance design, web development, IT consulting, and collaborative app builds.
* **Service Offerings**: Webpage Design, Website Package (DNS/SSL/hosting/SEO), IT Consultation (ServiceNow/Jira workflow optimization, SOP docs), and collaborative App Development.
* **Operating Schedule**: Client sprints and consultation sessions primarily on weekend windows (GMT+8) with daily async communication.

---

## 📁 Repository Structure

```text
├── react-app/                     # ← THE LIVE APP (React 19 + Vite + Motion)
│   ├── src/
│   │   ├── pages/                 # MinimalHubPage (landing), HomePage (full console), PersonalityPage
│   │   ├── pages/sections/        # Hero, Services, Skills, Pipeline, Profile, Experience, Credentials, RecentProjects, Contact
│   │   ├── components/            # Navbar, Footer, CommandPalette, TerminalDrawer, ParticleCanvas, CustomCursor, ThemeSelector, ...
│   │   ├── context/               # ThemeContext (theme tokens + palettes)
│   │   ├── hooks/                 # useAudio, useScramble, useReducedMotion
│   │   ├── services/              # audioEngine (Web Audio API)
│   │   └── assets/                # images, self-hosted fonts (Space Grotesk / Instrument Sans / JetBrains Mono), CV PDF
│   ├── public/                    # 404.html (SPA deep-link fallback), favicon.svg, icons.svg, CV PDF
│   ├── index.html                 # SPA entry (carries the GitHub Pages ?p= deep-link decoder)
│   ├── vite.config.ts             # @ → src alias
│   └── package.json
├── .github/workflows/deploy.yml   # Builds react-app → deploys react-app/dist to GitHub Pages on push
├── .hermes.md                     # Hermes agent project context (auto-loaded each session)
├── README.md                      # This file
├── start.bat / build.bat / push.bat   # Dev / build / push helpers
└── (legacy static index.html, index2.html, personality.html, and root assets/ were removed — see git history)
```

> **Note:** The live site is the React app. The legacy vanilla static `index.html` / `personality.html` and the duplicate root `assets/` tree were removed — they were never part of the deployed `react-app/dist` artifact.

---

## 🛠️ Tech Stack & Standards

| Layer | Technology |
|---|---|
| **Framework** | React 19 + TypeScript (strict) |
| **Build / Dev** | Vite 8 (HMR, `@/` path alias) |
| **Animation** | Motion 13 (`motion/react`) |
| **Routing** | react-router 7 (SPA, `/`, `/console`, `/portfolio`, `/personality`) |
| **Styling & Theme** | Hand-authored CSS3 (Custom Properties, Grid, Flexbox, Glassmorphism) via `ThemeContext` |
| **Logic & Interactivity** | React hooks, Web Audio API, IntersectionObserver, Intl |
| **Lint** | oxlint |
| **Fonts** | Space Grotesk, Instrument Sans, JetBrains Mono (self-hosted in `src/assets/fonts/`) |
| **Hosting & DNS** | GitHub Pages + Custom Domain (`nerzon.online`) + Cloudflare/SSL |

---

## 🚀 Local Development & Preview

Requires Node.js 22+ (matches the CI deploy runner).

```bash
# From the repo root:
cd react-app

# Install dependencies (first time only)
npm install

# Start the Vite dev server → http://localhost:5173
npm run dev

# Production build → react-app/dist
npm run build

# Preview the production build locally
npm run preview

# Lint
npm run lint
```

Or use the helper scripts at the repo root:
```bat
start.bat   # cd react-app && npm install && npm run dev -- --open
build.bat   # cd react-app && npm run build
push.bat    # git add . && commit && git push origin main   ⚠️ pushes trigger a LIVE deploy
```

---

## 🚢 Deployment

Deployment is **automatic** via GitHub Actions (`.github/workflows/deploy.yml`):

1. On every `git push` to `main` (or manual `workflow_dispatch`):
2. Checkout → setup Node 22 → `npm ci` in `react-app/` → `npm run build`
3. Upload **only `react-app/dist`** to GitHub Pages.

> ⚠️ **Because push = deploy, always review commits locally before pushing.** Deep links on GitHub Pages work via the `?p=…` rewrite (`public/404.html` fallback + decoder in `react-app/index.html`); Vite `base` is unset (domain root).

---

## 📬 Contact & Connect

* **Website**: [https://nerzon.online](https://nerzon.online/)
* **Email**: [erzon22@gmail.com](mailto:erzon22@gmail.com)
* **LinkedIn**: [linkedin.com/in/erzon22](https://linkedin.com/in/erzon22)
* **WhatsApp**: [+63 916 527 1923](https://wa.me/639165271923)

---

<div align="center">
  <sub>Designed as an Operations Console · © 2026 John Nerzon Polintan. All rights reserved.</sub>
</div>
