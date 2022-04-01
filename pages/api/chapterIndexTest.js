import dbConnect from "../../lib/mongoose";
import Chapter from "../../models/Chapter";

export default async function chapterIndexTest(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        Chapter.create({
          bookId: "somethingTemporary",
        }).catch((err) => {
          console.log(err);
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
