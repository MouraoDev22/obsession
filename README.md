<div align="center">

# 🎧 Obsession — Original Soundtrack Player

**A cinematic web player for the _Obsession_ original motion picture soundtrack.**

[English](README.md) · [Português (PT-BR)](README.pt-BR.md)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![React Compiler](https://img.shields.io/badge/React%20Compiler-enabled-FF4785?logo=react&logoColor=white)
![CSS Modules](https://img.shields.io/badge/Styling-CSS%20Modules-36454F)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-2EA44F)

</div>

---

## 📖 About

**Obsession** is a single-page web application that presents the _Obsession_ original motion picture soundtrack as a virtual record sleeve. Browse the tracklist split into **Side A** and **Side B**, select a track to play it through the YouTube IFrame Player API, and explore the page with its cursor-responsive parallax background.

The project is a showcase of modern frontend development: **React 19**, the **React Compiler**, strict **TypeScript**, **Vite 8**, and zero UI frameworks — just handcrafted CSS Modules.

## ✨ Features

- 🎵 **26 soundtrack tracks** — split evenly into Side A and Side B, with side-relative labels (`A01`–`A13` and `B01`–`B13`).
- ▶️ **Fixed audio player** — plays tracks through a hidden YouTube IFrame API embed, with play/pause toggle, live status ("Loading… / Playing / Paused") and close button.
- 🖼️ **Track artwork** — cover images are served from `public/`, with lazy loading and the album cover as a fallback when an image is unavailable.
- 🌀 **Parallax background** — the page background moves opposite to the cursor, driven by CSS variables and throttled with `requestAnimationFrame`.
- 📎 **Data-driven footer** — project purpose, author, movie credits and official Spotify/purchase links live in JSON files under `src/data/`.
- ♿ **Accessibility features** — named controls, status announcements, keyboard focus restoration, and live support for `prefers-reduced-motion`.
- 🧼 **Strict typing** — dedicated `interfaces/` and `types/` folders, explicit return types everywhere, and typed props for every component.
- ⚡ **React Compiler** — automatic memoization enabled via Babel preset for optimal render performance.
- 🌐 **Robust YouTube URL parsing** — supports `youtu.be/<id>`, `/watch?v=`, `/embed/`, `/shorts/` and `/live/` formats.

## 🖼️ Creating Track Covers

Open the [Obsession Cover Images prompt](docs/OBSESSION-COVER-IMAGES.md) in an image-capable LLM. Provide the source image and the style-reference image for each cover; the prompt describes the consistent red-and-black treatment and 1254 × 1254 px output.

## 🛠️ Tech Stack

| Category             | Tool                                                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Framework            | [React 19](https://react.dev/)                                                                                          |
| Language             | [TypeScript 7](https://www.typescriptlang.org/)                                                                         |
| Build tool           | [Vite 8](https://vite.dev/) with [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react)                  |
| Compiler             | [React Compiler](https://react.dev/learn/react-compiler) (via `@rolldown/plugin-babel` + `babel-plugin-react-compiler`) |
| Styling              | CSS Modules + CSS custom properties                                                                                     |
| Fonts                | Google Fonts — _Anton_ and _Space Mono_                                                                                 |
| Playback             | [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)                                 |
| Linting / Formatting | ESLint 10 + `typescript-eslint`, Prettier (with CSS order, import sorting and JSON sorting plugins)                     |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **20.19+** or **22.12+** (required by Vite 8)
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/MouraoDev22/obsession.git
cd obsession

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at the local URL printed in the terminal (usually `http://localhost:5173`).

## 📜 Scripts

| Script            | Description                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| `npm run dev`     | Starts the Vite development server with HMR                                                            |
| `npm run build`   | Runs ESLint, formats the repository with Prettier, checks types with `tsc -b`, and builds into `dist/` |
| `npm run preview` | Serves the production build locally                                                                    |
| `npm run lint`    | Runs ESLint across the project                                                                         |
| `npm run format`  | Formats the codebase with Prettier                                                                     |

`npm run build` and `npm run format` format files across the repository. Review the diff afterward. For checks without repository-wide formatting, run `npm run lint`, `npx prettier --check <changed-files>`, `npx tsc -b`, and `npx vite build` separately. There is no `npm test` script configured.

## 📂 Project Structure

```
obsession/
├── docs/
│   ├── AI-TOOLS.md                    # Repository-local AI-agent and skill guidance
│   └── OBSESSION-COVER-IMAGES.md      # Reusable English prompt for cover artwork
├── public/                  # Static assets (song covers, favicon, icons)
├── src/
│   ├── assets/              # Images bundled by Vite (background, etc.)
│   ├── components/          # UI components (CSS Module per component)
│   │   ├── Main/            # <main> layout wrapper
│   │   ├── Footer/          # <footer> wrapper (purpose · author · credits · links)
│   │   ├── FooterAbout/     # Project purpose section
│   │   ├── FooterAuthor/    # Author section (GitHub links)
│   │   ├── FooterCredits/   # Movie credits (director, composer, studios…)
│   │   ├── FooterLinks/     # Official Spotify / purchase links
│   │   ├── OstHero/         # Soundtrack header/hero
│   │   ├── OstSongList/     # Side A / Side B tracklist
│   │   ├── OstSongCard/     # Clickable track card
│   │   ├── OstSongCover/    # Track cover image
│   │   ├── OstSongTitle/    # Track title + track label
│   │   └── OstAudioPlayer/  # Fixed footer player (YouTube embed)
│   ├── data/
│   │   ├── credits.json      # Movie credits (director, studios, release)
│   │   ├── links.json        # Official Spotify / purchase links
│   │   ├── project.json      # Purpose, author and copyright lines
│   │   └── songs.json        # The soundtrack data (single source of truth)
│   ├── interfaces/          # Shared prop and state interfaces
│   ├── types/               # Type aliases (OstPlayRequest, OstSongs, …)
│   └── utils/
│       ├── parallax/        # Static cursor-following background utility
│       ├── smoothScroll/    # Static Lenis methods for page and container scroll
│       └── youtube/         # Static IFrame API loader + video ID parser
├── index.html               # Entry HTML (fonts, lang, meta)
├── vite.config.ts           # Vite + React + React Compiler presets
└── tsconfig*.json           # Strict TypeScript project references
```

## 🎼 Adding or Editing Songs

The catalog is defined in [`src/data/songs.json`](src/data/songs.json). To edit a track, update its existing object. Each `id` must be unique; keep IDs as strings and preserve the existing catalog order. For a new track, use the next unused numeric ID (currently `27`), add its cover image to `public/`, then add the entry:

```json
{
  "cover": "/my-new-track.png",
  "id": "27",
  "title": "My New Track",
  "youtubeUrl": "https://www.youtube.com/watch?v=XXXXXXXXXXX"
}
```

| Field        | Description                                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| `id`         | Unique string key used in React lists. Keep the existing IDs and order; use the next unused number for a new track. |
| `cover`      | Root-relative path to an image in `public/` (for example, `/my-new-track.png`). The file must exist.                |
| `title`      | Track title shown in the list and the player.                                                                       |
| `youtubeUrl` | Any common YouTube link format — the video ID is extracted automatically.                                           |

> The list is split at the midpoint at runtime: Side A gets the extra track when the total is odd. Track labels restart at `01` on each side. After changing the catalog, verify the count and split shown in the app; YouTube availability and rights must be checked separately.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request. For a pull request:

1. Fork the repository or create a feature branch from `main`.
2. Make focused commits using clear messages (Conventional Commits are welcome).
3. Run the applicable checks below and record their actual results.
4. Push your branch and open a pull request using the [PR template](.github/pull_request_template.md).

For documentation-only changes, check Markdown formatting and links. For code changes, run `npm run lint`, `npx prettier --check <changed-files>`, `npx tsc -b`, and `npx vite build` as applicable. Do not use `npm run build` as a validation shortcut: it also runs Prettier with `--write` across the repository. Record only checks actually performed and avoid unrelated formatting changes.

## 🤖 AI Agent Documentation

Repository-local agent skills and their documented roles, usage notes, and provenance limitations are described in [AI tools and agent documentation](docs/AI-TOOLS.md). Skills present in the repository are not necessarily used for every change; the document distinguishes available skills from skills used for this documentation update.

## 📄 License

MIT License.

---

<div align="center">
  <sub>Built with ❤️ using React, TypeScript and Vite.</sub>
</div>
