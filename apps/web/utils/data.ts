export const EXCLUDED_FILES = [
  "node_modules",
  "dist",
  "build",
  ".git",
  "public", // Exclude the public folder
  "assets", // Exclude assets folder (common for favicons, images, etc.)
  "images", // Exclude images folder
  "icons", // Exclude icons folder
  "favicon.ico", // Exclude favicon files
  "*.png", // Exclude PNG files
  "*.jpg", // Exclude JPG files
  "*.jpeg", // Exclude JPEG files
  "*.gif", // Exclude GIF files
  "*.svg", // Exclude SVG files
  "*.woff", // Exclude font files
  "*.woff2",
  "*.ttf",
  "*.eot",
  "*.mp4", // Exclude video files
  "*.webm",
  "*.mp3", // Exclude audio files
  "*.log", // Exclude log files
  "*.lock", // Exclude lock files (e.g., package-lock.json)
  "pnpm-lock.yaml",
  "yarn.lock",
  "package-lock.json",
  "bun.lockb",
];

export const validCodeFiles = [
  // Common files
  "README.md",
  ".gitignore",
  "LICENSE",
  // Python files
  "requirements.txt",
  "setup.py",
  "main.py",
  // JavaScript files
  "package.json",
  "index.js",
  // Go files
  "go.mod",
  "main.go",
  // Directories
  "src/",
  "lib/",
  "tests/",
];

export const MAX_SIZE_LIMIT_FOR_FREE_PLAN = 5;
export const MAX_SIZE_LIMIT_FOR_PRO_PLAN = 50;

export const MAX_SIZE_LIMIT_FOR_FREE_PLAN_ZIP = 2;
export const MAX_SIZE_LIMIT_FOR_PRO_PLAN_ZIP = 50;
