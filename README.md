<div align="center">

# ReadmeForge

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Gemini](https://img.shields.io/badge/Gemini-2.0_Flash-4285F4?logo=google&logoColor=white)](https://aistudio.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22C55E)](LICENSE)

GitHub README scorer and AI generator. Paste any public repo URL to score the existing README across four dimensions, then generate a production-ready replacement — powered by Gemini 2.0 Flash, free with no credit card required.

</div>

---

## Features

- **Instant Scoring** — Analyze any public GitHub repo README in seconds, no API key needed
- **AI Generation** — Gemini 2.0 Flash generates a production-ready README using real repo context
- **4-Dimension Scoring** — Completeness, Setup Instructions, Clarity, Badges
- **Side-by-Side Diff** — Toggle between original and generated README
- **One-Click Copy** — Copy the generated markdown instantly

---

## Getting Started

### Prerequisites

- Node.js 18+
- GitHub token *(optional — raises API rate limit)*
- Gemini API key *(free, no credit card — get one at [aistudio.google.com](https://aistudio.google.com))*

### Installation

```bash
git clone https://github.com/prachi-satbhai0741/ReadmeForge.git
cd ReadmeForge
npm install
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
GEMINI_API_KEY=your-key-here
GITHUB_TOKEN=ghp_...        # optional
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## How It Works

```
User pastes GitHub URL
       ↓
GitHub REST API fetches repo metadata, README, and file tree
       ↓
Deterministic scorer produces a 4-dimension score (0–100)
       ↓
Gemini 2.0 Flash generates a new README using real repo context
       ↓
UI renders score breakdown, generated README, and diff toggle
```

### Scoring Dimensions

| Dimension | Max | What's Checked |
|---|---|---|
| Completeness | 30 | Installation, Usage, Contributing, License, Description sections |
| Setup Instructions | 30 | Code blocks, install command, run command |
| Clarity | 20 | Word count, heading structure, length |
| Badges | 20 | shields.io badge count |

---

## Project Structure

```
ReadmeForge/
├── src/
│   └── app/
│       ├── fonts/
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── components/
│   ├── DiffViewer.tsx
│   ├── HeroSection.tsx
│   ├── ReadmePreview.tsx
│   ├── ScoreCard.tsx
│   └── URLInput.tsx
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS |
| LLM | Google Gemini 2.0 Flash |
| Data | GitHub REST API v3 |

---

## Contributing

```bash
git checkout -b feat/your-feature
# make changes
git commit -m "feat: describe your change"
git push origin feat/your-feature
```

Open a PR — one feature per PR.

---

## License

MIT — see [LICENSE](LICENSE) for details.
