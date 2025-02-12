const express = require("express");
const { getGames, getGameById, getGenres, getGenreById } = require("./games");

const app = express();
app.use(express.json());

// Exercise 1: Get All Games
app.get("/api/games", async (req, res) => {
  try {
    const games = await getGames();
    if (games.length === 0) {
      return res.status(404).json({ error: "No games found" });
    }
    return res.json(games);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Exercise 2: Get Game by ID
app.get("/api/games/:id", async (req, res) => {
  try {
    const game = await getGameById(parseInt(req.params.id));
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Exercise 3: Get All Genres
app.get("/api/genres", async (req, res) => {
  try {
    const genres = await getGenres();
    if (genres.length === 0) {
      return res.status(404).json({ error: "No genres found" });
    }
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Exercise 4: Get Genre by ID
app.get("/api/genres/:id", async (req, res) => {
  try {
    const genre = await getGenreById(parseInt(req.params.id));
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }
    res.json(genre);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { app };
