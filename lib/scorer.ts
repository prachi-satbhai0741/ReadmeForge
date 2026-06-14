export interface Dimension {
  label: string;
  score: number;
  max: number;
  feedback: string;
}

export interface ScoreResult {
  total: number;
  dimensions: Dimension[];
}

export function scoreReadme(readme: string, fileTree: string[]): ScoreResult {
  const text = readme.toLowerCase();

  // 1. Completeness (30 pts)
  const sections = ["installation", "usage", "contributing", "license", "description"];
  const found = sections.filter((s) => text.includes(s));
  const completeness = Math.round((found.length / sections.length) * 30);

  // 2. Setup instructions (30 pts)
  const hasCodeBlock = /```/.test(readme);
  const hasInstall = /npm install|pip install|yarn add|brew install|apt install/i.test(readme);
  const hasRunCmd = /npm run|npm start|python |node |go run/i.test(readme);
  const setup = (hasCodeBlock ? 12 : 0) + (hasInstall ? 10 : 0) + (hasRunCmd ? 8 : 0);

  // 3. Clarity (20 pts)
  const wordCount = readme.split(/\s+/).length;
  const hasHeadings = /^#{1,3} /m.test(readme);
  const clarity =
    (wordCount >= 100 ? 8 : Math.round((wordCount / 100) * 8)) +
    (hasHeadings ? 7 : 0) +
    (wordCount <= 2000 ? 5 : 2); // penalise walls of text

  // 4. Badges (20 pts)
  const hasBadge = /!\[.*?\]\(https?:\/\/(img\.shields\.io|badge\.fury\.io|github\.com\/[^)]+\/workflows)/i.test(readme);
  const hasMultiBadge = (readme.match(/!\[.*?\]\(https?:\/\/img\.shields\.io/gi) || []).length >= 3;
  const badges = hasBadge ? (hasMultiBadge ? 20 : 12) : 0;

  const total = Math.min(100, completeness + setup + clarity + badges);

  return {
    total,
    dimensions: [
      {
        label: "Completeness",
        score: completeness,
        max: 30,
        feedback: found.length < sections.length
          ? `Missing sections: ${sections.filter((s) => !text.includes(s)).join(", ")}`
          : "All key sections present.",
      },
      {
        label: "Setup Instructions",
        score: setup,
        max: 30,
        feedback: !hasInstall
          ? "Add an install command (npm install, pip install, etc.)"
          : !hasRunCmd
          ? "Add a run/start command so users know how to launch the project."
          : "Setup instructions look solid.",
      },
      {
        label: "Clarity",
        score: clarity,
        max: 20,
        feedback:
          wordCount < 100
            ? "README is too short — add more context."
            : !hasHeadings
            ? "Use ## headings to structure the content."
            : "Clarity looks good.",
      },
      {
        label: "Badges",
        score: badges,
        max: 20,
        feedback: !hasBadge
          ? "Add shields.io badges (build status, license, version)."
          : !hasMultiBadge
          ? "Add more badges for richer at-a-glance info."
          : "Great badge coverage.",
      },
    ],
  };
}
