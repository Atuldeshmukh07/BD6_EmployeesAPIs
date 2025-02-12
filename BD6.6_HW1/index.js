const cors = require("cors");
const express = require("express");
const { getAllMovies, getMovieById } = require("./controllers");

const app = express();
app.use(cors());
app.use(express.json());

// Endpoints
// < ------------------ Get all Movies ------------------ >
app.get("/movies", async (req, res) => {
  const employees = getAllMovies();
  res.status(200).json(employees);
});

// < ------------------ Get Movies by ID ------------------ >
app.get("/movies/details/:id", async (req, res) => {
  const movie = getMovieById(parseInt(req.params.id));
  res.status(200).json(movie);
});

module.exports = { app };
