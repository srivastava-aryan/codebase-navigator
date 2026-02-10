import simpleGit from "simple-git";
import fs from "fs-extra";
import path from "path";

export async function cloneRepo(repoUrl) {
  const repoName = repoUrl.split("/").pop().replace(".git", "");
  const basePath = path.join("repos");
  const repoPath = path.join(basePath, repoName);

  await fs.ensureDir(basePath);

  if (await fs.pathExists(repoPath)) {
    await fs.remove(repoPath);
  }

  const git = simpleGit();
  await git.clone(repoUrl, repoPath);

  return repoPath;
}
