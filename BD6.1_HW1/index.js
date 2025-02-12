let { getMovies, getMovieById, addMovie } = require("./movie");
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json);

app.get("/api/movies", (req, res) => {
  res.json(getMovies());
});

app.get("/api/movies/:id", (req, res) => {
  const movie = getMovieById(req.params.id);
  if (!movie) return res.status(404).send("Movie not found.");
  res.json(movie);
});

app.post("/api/movies", (req, res) => {
  const newMovie = addMovie(req.body);
  res.status(201).json(newMovie);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
