import dbConnect from "../../../lib/mongoose";
import Book from "../../../models/Book";
import Chapter from "../../../models/Chapter";

async function chapter(req, res) {
  const { slugs } = req.query;

  // slugs.length == 1: api/books/book-slug
  // slugs.length == 2: api/books/book-slug/chapter-slug
  const { method } = req;
  let bookSlug, chapterSlug;
  switch (slugs.length) {
    case 1:
      bookSlug = slugs[0];
      await dbConnect();
      switch (method) {
        case "GET":
          try {
            const bookResult = await Book.find({ slug: bookSlug });
            if (bookResult.length === 0) {
              res
                .status(400)
                .json({ success: false, errorMessage: "No book found" });
            } else if (bookResult.length > 1) {
              res.status(400).json({
                success: false,
                errorMessage: "More than one book found",
              });
            } else {
              const book = bookResult[0].toObject();
              book._id = bookResult[0]._id.toString();

              const chapterResult = await Chapter.find({
                bookId: book._id,
              });
              if (chapterResult.length === 0) {
                res
                  .status(400)
                  .json({ success: false, errorMessage: "No chapter found" });
              } else {
                const chapters = chapterResult.map((chapter) => {
                  const processedChapter = chapter.toObject();
                  processedChapter._id = chapter._id.toString();
                  return processedChapter;
                });
                res.status(200).json({ success: true, chapters });
              }
            }
          } catch (error) {
            console.log(error);
            res
              .status(400)
              .json({ success: false, errorMessage: "GET resulted in error" });
          }
          break;
        default:
          res
            .status(400)
            .json({ success: false, errorMessage: "不該走到這..." });
          break;
      }
      break;
    case 2:
      bookSlug = slugs[0];
      chapterSlug = slugs[1];
      await dbConnect();

      switch (method) {
        case "GET":
          try {
            const bookResult = await Book.find({ slug: bookSlug });
            if (bookResult.length === 0) {
              res
                .status(400)
                .json({ success: false, errorMessage: "No book found" });
            } else if (bookResult.length > 1) {
              res.status(400).json({
                success: false,
                errorMessage: "More than one book found",
              });
            } else {
              const book = bookResult[0].toObject();
              book._id = bookResult[0]._id.toString();

              const chapterResult = await Chapter.find({
                bookId: book._id,
                slug: chapterSlug,
              });
              if (chapterResult.length === 0) {
                res
                  .status(400)
                  .json({ success: false, errorMessage: "No chapter found" });
              } else if (chapterResult.length > 1) {
                res.status(400).json({
                  success: false,
                  errorMessage: "More than one chapter found",
                });
              } else {
                const chapter = chapterResult[0].toObject();
                chapter._id = chapterResult[0]._id.toString();
                res.status(200).json({ success: true, chapter });
              }
            }
          } catch (error) {
            console.log(error);
            res
              .status(400)
              .json({ success: false, errorMessage: "GET resulted in error" });
          }
          break;
        default:
          res
            .status(400)
            .json({ success: false, errorMessage: "不該走到這..." });
      }
      break;
    default:
      res.status(400).json({ success: false, errorMessage: "網址有問題" });
      break;
  }
}

export default chapter;
