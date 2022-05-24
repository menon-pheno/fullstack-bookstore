import { Octokit } from "octokit";

async function repoContent(req, res) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });

  console.log(req.query);
  const owner = req.query.owner;
  const repo = req.query.repo;

  try {
    const mainFolder = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: "",
    });

    const chapters = await Promise.all(
      mainFolder.data.map(async (file) => {
        if (file.type !== "file") {
          return;
        }

        const chapter = await octokit.rest.repos.getContent({
          owner,
          repo,
          path: file.path,
        });
        //Buffer.from(str, 'base64') andbuf.toString('base64')
        const buffer = Buffer.from(chapter.data.content, "base64");
        return {
          title: file.path,
          content: buffer.toString("utf8"),
        };
      })
    );
    res.status(200).json({ chapters });
  } catch (error) {
    console.log("get main folder of git error");
    console.log(error);
    res.status(500);
  }
}

export default repoContent;
