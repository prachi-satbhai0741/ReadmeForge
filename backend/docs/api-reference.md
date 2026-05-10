# API Reference

Base URL: `http://localhost:3000`

---

## GET /api/health

Returns service status.

**Response**

```json
{
  "status": "ok",
  "timestamp": "2026-05-10T10:00:00.000Z"
}
```

---

## POST /api/analyze

Analyzes a GitHub repository. Returns a score for the existing README and a generated replacement.

**Request body**

```json
{
  "repoUrl": "https://github.com/owner/repo"
}
```

**Response**

```json
{
  "owner": "prachi-satbhai0741",
  "repo": "Taskboard",
  "score": {
    "total": 78,
    "label": "Good",
    "breakdown": {
      "completeness": 28,
      "setup": 25,
      "clarity": 15,
      "badges": 10
    }
  },
  "generated": "# Taskboard\n\n...",
  "meta": {
    "stars": 12,
    "language": "Go",
    "description": "A production-style developer task board REST API built in Go",
    "topics": ["docker", "go", "rest-api"]
  }
}
```

**Scoring dimensions**

| Dimension | Max | What is measured |
|-----------|-----|-----------------|
| completeness | 35 | Description, tech stack, endpoints, structure, license |
| setup | 30 | Clone, install, run steps, environment variable docs |
| clarity | 20 | Section headings, code blocks, overall length |
| badges | 15 | shields.io or equivalent badges present |

**Error responses**

| Status | Message |
|--------|---------|
| 400 | `repoUrl is required.` |
| 400 | `Invalid GitHub repository URL.` |
| 403 | `GitHub API rate limit exceeded. Add a GITHUB_TOKEN to increase the limit.` |
| 404 | `Repository not found.` |
| 429 | `Too many requests from this IP. Please wait 15 minutes before trying again.` |
| 500 | `Internal server error.` |

---

## Rate limiting

`/api/analyze` is rate-limited to 20 requests per IP per 15 minutes by default.
Adjust via `RATE_LIMIT_MAX` in `.env`.

The GitHub API allows 60 unauthenticated requests/hour per IP. Set `GITHUB_TOKEN` in `.env` to raise this to 5000/hour.

