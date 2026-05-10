# ReadmeForge

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Claude API](https://img.shields.io/badge/Claude_API-Sonnet-7B5EA7?style=flat-square)](https://docs.anthropic.com)

A developer tool that accepts a GitHub repository URL, scores the existing README across four dimensions, and generates a polished production-ready replacement using the Claude API.

---

## Repository Structure

```
ReadmeForge/
├── frontend/      React + Vite SPA
├── backend/       Express REST API
├── LICENSE
└── README.md
```

---

## Running Locally

Both services run independently on separate ports.

**Backend** (port 3000)

```bash
cd backend
cp .env.example .env
# fill in ANTHROPIC_API_KEY and optionally GITHUB_TOKEN
npm install
npm run dev
```

**Frontend** (port 5173)

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The frontend proxies API requests to `http://localhost:3000`.

---

## How it works

1. User pastes a public GitHub repo URL.
2. Backend fetches repo metadata, README content, and file tree via the GitHub REST API.
3. A deterministic scorer evaluates the existing README across four dimensions — completeness, setup instructions, clarity, and badges — and returns a 0-100 score.
4. The Claude API generates a new README using the actual repo content as context.
5. Frontend renders the score breakdown and the generated README, with a one-click copy.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5, CSS modules |
| Backend | Node.js, Express 4 |
| LLM | Anthropic Claude API (claude-sonnet-4) |
| Data | GitHub REST API v3 |
| Middleware | express-rate-limit, morgan |

---

## Contributing

Contributions are welcome. To get started:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-feature-name`
3. Make your changes and commit: `git commit -m "feat: describe your change"`
4. Push to your fork: `git push origin feat/your-feature-name`
5. Open a Pull Request against the `main` branch.

Please keep PRs focused — one feature or fix per PR. For larger changes, open an issue first to discuss the approach before writing code.

---

## Author

Prachi Satbhai — [GitHub](https://github.com/prachi-satbhai0741)

---

## License

MIT — see [LICENSE](./LICENSE) for details.

---

If this project saved you time, consider giving it a star — it helps others find it.

