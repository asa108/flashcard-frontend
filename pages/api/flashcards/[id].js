const { flashcards } = require("./data.json");

// get single data
export default function handler(req, res) {
  const fc = flashcards.filter((f) => f.id === req.query.id);
  if (req.method == "GET") {
    res.status(200).json(fc);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
}
