const cors = require("cors");
const express = require("express");
const { getAllGames, getGameById } = require("./controllers");

const app = express();
app.use(cors());
app.use(express.json());

// Endpoints
// < ------------------ Get all Games ------------------ >
app.get("/games", async (req, res) => {
  const games = getAllGames();
  res.status(200).json(games);
});

// < ------------------ Get Game by ID ------------------ >
app.get("/games/details/:id", async (req, res) => {
  const game = getGameById(parseInt(req.params.id));
  res.status(200).json(game);
});

module.exports = { app };
