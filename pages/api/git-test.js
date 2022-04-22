import { Octokit } from "octokit";

async function gitTest(req, res) {
  const octokit = new Octokit({
    auth: `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`,
  });

  const result = await octokit.rest.repos.listForAuthenticatedUser();
  const repos = result.data.map((entry) => entry.name);

  res.status(200).json({ repos });
}

export default gitTest;
