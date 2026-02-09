import fs from "fs-extra";
import path from "path";

const IGNORE_DIRS = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "coverage",
  "package-lock.json",
];

const ALLOWED_EXTENSIONS = [
  ".js", ".ts", ".jsx", ".tsx", ".json"
];

export async function readRepoFiles(repoPath) {
  const files = [];

  async function walk(dir) {
    const items = await fs.readdir(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = await fs.stat(fullPath);

      if (stat.isDirectory()) {
        if (!IGNORE_DIRS.includes(item)) {
          await walk(fullPath);
        }
      } else {
        if (ALLOWED_EXTENSIONS.includes(path.extname(item))) {
          const content = await fs.readFile(fullPath, "utf-8");
          files.push({
            filePath: fullPath.replace(repoPath, ""),
            content
          });
        }
      }
    }
  }

  await walk(repoPath);
  return files;
}
