const express = require("express");
const app = express();
app.use(express.json());

let users = [];
let books = [];
let reviews = [];

function validateUser(user) {
  if (!user.name || typeof user.name !== "string") {
    return "Name is required and should be string.";
  }
  if (!user.email || typeof user.email !== "string") {
    return "Email is required and should be string.";
  }
  return null;
}

function validateBook(book) {
  if (!book.title || typeof book.title !== "string") {
    return "Title is required and should be string.";
  }
  if (!book.author || typeof book.author !== "string") {
    return "Author is required and should be string.";
  }
  return null;
}

function validateReview(review) {
  if (!review.content || typeof review.content !== "string") {
    return "Review content is required and should be string.";
  }
  if (!review.userId || typeof review.userId !== "number") {
    return "User id is required and should be number.";
  }
  return null;
}

// Endpoints

// Exercise 1: Create a User
app.post("/api/users", (req, res) => {
  let error = validateUser(req.body);
  if (error) {
    return res.status(400).send({ error });
  }
  let user = { id: users.length + 1, ...req.body };
  users.push(user);
  return res.status(201).send(user);
});

// Exercise 2: Get All Users
app.post("/api/books", (req, res) => {
  let error = validateBook(req.body);
  if (error) {
    return res.status(400).send({ error });
  }
  let book = { id: books.length + 1, ...req.body };
  books.push(book);
  return res.status(201).send(book);
});

// Exercise 3: Get All Books
app.post("/api/reviews", (req, res) => {
  let error = validateReview(req.body);
  if (error) {
    return res.status(400).send({ error });
  }
  let review = { id: reviews.length + 1, ...req.body };
  reviews.push(review);
  return res.status(201).send(review);
});

module.exports = { app, validateBook, validateUser, validateReview };
