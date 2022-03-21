export default function handler(req, res) {
  const { bookInfo } = req.query;
  res.end(`Book: ${bookInfo.join("-")}`);
}
