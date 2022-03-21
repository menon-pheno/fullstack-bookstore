export default function handler(req, res) {
  const { bookId } = req.query;
  res.end(
    `BookId: ${bookId}, usually get bookId's related data from DB and return as well`
  );
}
