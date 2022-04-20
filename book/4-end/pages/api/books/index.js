import dbConnect from "../../../lib/mongoose";
import Book from "../../../models/Book";

async function books(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const result = await Book.find({});
        const books = result.map((doc) => {
          const book = doc.toObject();
          book._id = book._id.toString();
          return book;
        });
        res.status(200).json({ success: true, books });
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

export default books;
