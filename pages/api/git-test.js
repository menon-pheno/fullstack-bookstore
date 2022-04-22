import { Octokit } from "octokit";

async function gitTest(req, res) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });

  const result = await octokit.rest.repos.listForAuthenticatedUser();
  const repos = result.data.map((entry) => entry.name);

  res.status(200).json({ repos });
}

export default gitTest;
