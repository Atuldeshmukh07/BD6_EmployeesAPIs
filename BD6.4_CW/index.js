let { getBooks, getBookById, getReviews, getReviewById } = require("./book");
const express = require("express");
const app = express();
app.use(express.json());

// Exercise 1: Get All Books
app.get("/api/books", async (req, res) => {
  try {
    const books = await getBooks();
    if (books.length === 0) {
      return res.status(404).json({ error: "No books found" });
    }
    return res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Exercise 2: Get Book by ID
app.get("/api/books/:id", async (req, res) => {
  try {
    const book = await getBookById(parseInt(req.params.id));
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Exercise 3: Get All Reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await getReviews();
    if (reviews.length === 0) {
      return res.status(404).json({ error: "No reviews found" });
    }
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Exercise 4: Get Review by ID
app.get("/api/reviews/:id", async (req, res) => {
  try {
    const review = await getReviewById(parseInt(req.params.id));
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { app };
