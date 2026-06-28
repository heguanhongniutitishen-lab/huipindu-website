import { Buffer } from "buffer";

type GitHubFile = {
  content?: string;
  sha?: string;
};

function getRepoConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO || "heguanhongniutitishen-lab/huipindu-website";
  const branch = process.env.GITHUB_BRANCH || "main";

  return { token, repo, branch };
}

async function githubRequest(path: string, init: RequestInit = {}) {
  const { token, repo } = getRepoConfig();

  if (!token) {
    throw new Error("GITHUB_TOKEN is not configured.");
  }

  const response = await fetch(`https://api.github.com/repos/${repo}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.headers || {})
    }
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`GitHub API failed: ${response.status} ${body}`);
  }

  return response;
}

export async function getGitHubFileSha(filePath: string) {
  const { branch } = getRepoConfig();
  const response = await githubRequest(`/contents/${filePath}?ref=${branch}`);
  const data = (await response.json()) as GitHubFile;
  return data.sha;
}

export async function writeGitHubFile(filePath: string, content: string | Buffer, message: string) {
  const { branch } = getRepoConfig();
  const sha = await getGitHubFileSha(filePath).catch(() => undefined);
  const encoded = Buffer.isBuffer(content) ? content.toString("base64") : Buffer.from(content, "utf8").toString("base64");

  await githubRequest(`/contents/${filePath}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message,
      content: encoded,
      branch,
      sha
    })
  });
}

export function hasGitHubWriteConfig() {
  return Boolean(getRepoConfig().token);
}
