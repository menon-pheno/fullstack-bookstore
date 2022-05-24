import dbConnect from "../../../lib/mongoose";
import Chapter from "../../../models/Chapter";

async function chapters(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const bookId = req.body.bookId;
        const chapters = req.body.chapters;
        for (let i = 0; i < chapters.length; i++) {
          await Chapter.add({
            bookId,
            title: chapters[i].title.split(".").slice(0, -1).join("."),
            content: chapters[i].content,
          });
        }
        res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

export default chapters;
