const BADGE_PATTERN = /!\[.*?\]\(https?:\/\/(img\.shields\.io|badge\.fury\.io|github\.com\/.*\/workflows)[^\)]+\)/gi;
const CODE_BLOCK_PATTERN = /```[\s\S]*?```/g;

const SETUP_KEYWORDS = ["install", "clone", "run", "start", "build", "docker", "npm", "pip", "go run", "make"];
const STRUCTURE_KEYWORDS = ["project structure", "directory", "folder", "layout", "├", "└", "│"];
const ENV_KEYWORDS = [".env", "environment variable", "env.example", "configuration"];

function clamp(val, max) {
  return Math.min(Math.round(val), max);
}

function scoreCompleteness(readme, meta) {
  let pts = 0;
  if (readme.length > 200) pts += 5;
  if (meta.description && meta.description.length > 20) pts += 5;
  const lower = readme.toLowerCase();
  if (lower.includes("what") || lower.includes("about") || lower.includes("overview")) pts += 5;
  if (STRUCTURE_KEYWORDS.some((k) => lower.includes(k))) pts += 5;
  if (lower.includes("license")) pts += 5;
  if (meta.language && lower.includes(meta.language.toLowerCase())) pts += 5;
  if (lower.includes("endpoint") || lower.includes("api") || lower.includes("route")) pts += 5;
  return clamp(pts, 35);
}

function scoreSetup(readme) {
  const lower = readme.toLowerCase();
  let pts = 0;
  const found = SETUP_KEYWORDS.filter((k) => lower.includes(k));
  pts += Math.min(found.length * 4, 16);
  if (lower.includes("git clone")) pts += 4;
  if (ENV_KEYWORDS.some((k) => lower.includes(k))) pts += 5;
  if ((readme.match(CODE_BLOCK_PATTERN) || []).length >= 2) pts += 5;
  return clamp(pts, 30);
}

function scoreClarity(readme) {
  let pts = 0;
  const headings = (readme.match(/^#{1,3} .+/gm) || []).length;
  if (headings >= 3) pts += 8;
  else if (headings >= 1) pts += 4;
  const codeBlocks = (readme.match(CODE_BLOCK_PATTERN) || []).length;
  if (codeBlocks >= 3) pts += 7;
  else if (codeBlocks >= 1) pts += 4;
  if (readme.length > 1000) pts += 5;
  return clamp(pts, 20);
}

function scoreBadges(readme) {
  const count = (readme.match(BADGE_PATTERN) || []).length;
  if (count >= 4) return 15;
  if (count === 3) return 12;
  if (count === 2) return 8;
  if (count === 1) return 4;
  return 0;
}

function label(total) {
  if (total >= 85) return "Excellent";
  if (total >= 65) return "Good";
  if (total >= 45) return "Needs work";
  return "Poor";
}

export function scoreReadme(readme, meta) {
  if (!readme || readme.trim().length === 0) {
    return {
      total: 0,
      breakdown: { completeness: 0, setup: 0, clarity: 0, badges: 0 },
      label: "No README",
    };
  }

  const completeness = scoreCompleteness(readme, meta);
  const setup = scoreSetup(readme);
  const clarity = scoreClarity(readme);
  const badges = scoreBadges(readme);
  const total = completeness + setup + clarity + badges;

  return { total, breakdown: { completeness, setup, clarity, badges }, label: label(total) };
}

