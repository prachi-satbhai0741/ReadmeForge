import "dotenv/config";
import express from "express";
import cors from "cors";
import { rateLimiter } from "./middleware/rateLimiter.js";
import { logger } from "./middleware/logger.js";
import { fetchRepoData } from "./github.js";
import { scoreReadme } from "./scorer.js";
import { generateReadme } from "./generator.js";
import { parseGithubUrl } from "./utils.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(logger);
app.use("/api/analyze", rateLimiter);

app.get("/", (_req, res) => {
  res.send("ReadmeForge Backend Running");
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/analyze", async (req, res) => {
  const { repoUrl } = req.body;

  if (!repoUrl || typeof repoUrl !== "string") {
    return res.status(400).json({
      error: "repoUrl is required.",
    });
  }

  const parsed = parseGithubUrl(repoUrl);

  if (!parsed) {
    return res.status(400).json({
      error: "Invalid GitHub repository URL.",
    });
  }

  const { owner, repo } = parsed;

  try {
    const repoData = await fetchRepoData(owner, repo);

    const score = scoreReadme(
      repoData.readme,
      repoData.meta
    );

    const generated = await generateReadme(repoData);

    res.json({
      owner,
      repo,
      score,
      generated,
      meta: {
        stars: repoData.meta.stargazers_count,
        language: repoData.meta.language,
        description: repoData.meta.description,
        topics: repoData.meta.topics || [],
      },
    });
  } catch (err) {
    console.error(`[analyze] ${err.message}`);

    const status = err.status || 500;

    res.status(status).json({
      error: err.message || "Internal server error.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`ReadmeForge backend running on http://localhost:${PORT}`);
});
