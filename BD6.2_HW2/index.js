const express = require("express");
const app = express();
app.use(express.json);

let movies = [
  { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
  { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
  { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
];

function getMovies() {
  return movies;
}

function getMovieById(id) {
  return movies.find((movie) => movie.id === id);
}
function addMovie(movie) {
  movies.push(movie);
  return movie;
}

app.get("/movies", (req, res) => {
  res.json(getMovies);
});
app.get("/movies/details/:id", (req, res) => {
  let id = parseInt(req.params.movieId);
  let movie = getMovieById(id);
  if (!movie) return res.status(404).send("movie not found.");
  res.json(movie);
});

app.post("/movies/new", (req, res) => {
  let movieId = req.query.movieId;
  let name = req.query.name;
  let book = req.query.book;
  let addedmovie = addMovie({ movieId, name, book });
  res.status(201).json(addedmovie);
});

module.exports = { app, getMovies, getMovieById, addMovie };
