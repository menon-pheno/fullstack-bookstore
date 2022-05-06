import { Octokit } from "octokit";

async function repos(req, res) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });

  const result = await octokit.rest.repos.listForAuthenticatedUser();
  const repos = result.data
    .map((entry) => entry.name)
    .filter((repo) => repo.startsWith("book"));

  res.status(200).json({ repos });
}

export default repos;
