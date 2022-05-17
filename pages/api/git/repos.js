import { Octokit } from "octokit";

async function repos(req, res) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });

  const result = await octokit.rest.repos.listForAuthenticatedUser();
  const repos = result.data
    .map((entry) => {
      return {
        id: entry.id,
        name: entry.name,
        fullName: entry.full_name,
      };
    })
    .filter((repo) => repo.name.startsWith("book"));

  res.status(200).json({ repos });
}

export default repos;
