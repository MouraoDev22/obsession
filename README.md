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

**Obsession** is a single-page web application that presents the complete _Obsession_ original motion picture soundtrack — **26 tracks by Rock Burwell** — as a beautifully crafted virtual record sleeve. Browse the tracklist split into **Side A** and **Side B**, click any track, and listen through an embedded YouTube player fixed at the bottom of the page, complete with a mouse-following parallax background.

The project is a showcase of modern frontend development: **React 19**, the **React Compiler**, strict **TypeScript**, **Vite 8**, and zero UI frameworks — just handcrafted CSS Modules.

## ✨ Features

- 🎵 **Full 26-track soundtrack** — organized in Side A / Side B with cassette-style track labels (`A01`, `B13`…).
- ▶️ **Fixed audio player** — plays tracks through a hidden YouTube IFrame API embed, with play/pause toggle, live status ("Loading… / Playing / Paused") and close button.
- 🖼️ **Custom cover art** — every track has its own cover image served from `public/`.
- 🌀 **Parallax background** — the page background moves opposite to the cursor, driven by CSS variables and throttled with `requestAnimationFrame`.
- 📎 **Data-driven footer** — project purpose, author, movie credits and official Spotify/purchase links live in JSON files under `src/data/`.
- ♿ **Accessible** — semantic markup, `aria-label`s on controls, and full respect for the `prefers-reduced-motion` media query (the parallax effect is disabled when the OS asks for reduced motion).
- 🧼 **Strict typing** — dedicated `interfaces/` and `types/` folders, explicit return types everywhere, and typed props for every component.
- ⚡ **React Compiler** — automatic memoization enabled via Babel preset for optimal render performance.
- 🌐 **Robust YouTube URL parsing** — supports `youtu.be/<id>`, `/watch?v=`, `/embed/`, `/shorts/` and `/live/` formats.

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

| Script            | Description                                                      |
| ----------------- | ---------------------------------------------------------------- |
| `npm run dev`     | Starts the Vite development server with HMR                      |
| `npm run build`   | Type-checks with `tsc -b` and builds for production into `dist/` |
| `npm run preview` | Serves the production build locally                              |
| `npm run lint`    | Runs ESLint across the project                                   |
| `npm run format`  | Formats the codebase with Prettier                               |

## 📂 Project Structure

```
obsession/
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
│   ├── interfaces/          # Shared prop/state interfaces
│   ├── types/               # Type aliases (OstPlayRequest, OstSongs, …)
│   └── utils/
│       ├── parallax/        # Cursor-following background effect
│       └── youtube/         # IFrame API loader + video ID parser
├── index.html               # Entry HTML (fonts, lang, meta)
├── vite.config.ts           # Vite + React + React Compiler presets
└── tsconfig*.json           # Strict TypeScript project references
```

## 🎼 Adding or Editing Songs

The tracklist is entirely data-driven. To add a new track, append an object to [`src/data/songs.json`](src/data/songs.json):

```json
{
  "cover": "/my-new-track.png",
  "id": "27",
  "title": "My New Track",
  "youtubeUrl": "https://www.youtube.com/watch?v=XXXXXXXXXXX"
}
```

| Field        | Description                                                               |
| ------------ | ------------------------------------------------------------------------- |
| `id`         | Unique, stable key used in React lists.                                   |
| `cover`      | Path to the cover image inside `public/`.                                 |
| `title`      | Track title shown in the list and the player.                             |
| `youtubeUrl` | Any common YouTube link format — the video ID is extracted automatically. |

> Tracks are split evenly between Side A and Side B at runtime, so no manual grouping is needed.

## 🎞️ Editing the Footer

The footer is data-driven too. Its content lives in three JSON files under [`src/data/`](src/data/):

| File                                    | Content                                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [`project.json`](src/data/project.json) | Purpose paragraphs, author (name, role and GitHub links) and the copyright lines                 |
| [`credits.json`](src/data/credits.json) | Movie credits shown in "Ficha técnica" (director, composer, studios, distribution, release date) |
| [`links.json`](src/data/links.json)     | Official listening/purchase links (`label` + `hint` + `href`) — Spotify, album and movie         |

The data is imported in [`src/App.tsx`](src/App.tsx) and passed down to the `Footer` sections as typed props, mirroring how `songs.json` feeds the tracklist.

## 🧠 Architecture Notes

- **State flow:** `App` owns the current `OstPlayRequest` state. Selecting a track dispatches a request; requesting the _same_ track again toggles play/pause; the close button clears the request and unmounts the player.
- **Data-driven content:** songs and footer content (purpose, credits, official links) live in JSON files imported by `App` and passed down as typed props.
- **YouTube loading:** the IFrame API script is loaded **once** and the resulting promise is cached, so replays never re-fetch the API. On failure, the cache is reset to allow retrying, and the UI falls back to an "Open on YouTube" link.
- **Parallax via CSS variables:** since `body::before` is unreachable from JavaScript, the offset is written to the `--parallax-x` / `--parallax-y` custom properties and consumed by the `transform` defined in `App.css` — keeping the effect on the compositor.
- **React Compiler:** enabled through the `reactCompilerPreset` in `vite.config.ts`, removing the need for manual `useMemo`/`useCallback` memoization.

## ♿ Accessibility

- All interactive elements are real `<button>`s (controls) or `<a>`s (external links) with descriptive accessible names.
- The parallax effect honors the `prefers-reduced-motion` media query.
- Decorative elements are marked with `aria-hidden="true"`.
- Color/status is always paired with text (e.g. player status), never conveyed by color alone.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request:

1. Fork the repository and create your branch: `git checkout -b feature/my-feature`
2. Commit your changes: `git commit -m "feat: add my feature"`
3. Push to the branch: `git push origin feature/my-feature`
4. Open a Pull Request.

Please run `npm run lint` and `npm run format` before submitting.

## 📄 License

This repository does not currently include a license file. All rights reserved to the soundtrack and its respective owners; this project is a non-commercial fan tribute.

---

<div align="center">
  <sub>Built with ❤️ using React, TypeScript and Vite.</sub>
</div>
