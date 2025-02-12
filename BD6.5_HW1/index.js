const express = require("express");
const app = express();
app.use(express.json());

let games = [];
let tournaments = [];

function validateGame(game) {
  if (!game.title || typeof game.title !== "string") {
    return "Title is required and should be string.";
  }
  if (!game.genre || typeof game.genre !== "string") {
    return "Genre is required and should be string.";
  }
  return null;
}

function validateTournament(tournament) {
  if (!tournament.name || typeof tournament.name !== "string") {
    return "Tournament name is required and should be string.";
  }
  if (!tournament.gameId || typeof tournament.gameId !== "number") {
    return "Game ID is required and should be number.";
  }
  return null;
}

// Exercise 1: Add a New Game
app.post("/api/games", (req, res) => {
  let error = validateGame(req.body);
  if (error) {
    return res.status(400).send({ error });
  }
  let game = { id: games.length + 1, ...req.body };
  games.push(game);
  return res.status(201).send(game);
});

// Exercise 2: Add a New Tournament
app.post("/api/tournaments", (req, res) => {
  let error = validateTournament(req.body);
  if (error) {
    return res.status(400).send({ error });
  }
  let tournament = { id: tournaments.length + 1, ...req.body };
  tournaments.push(tournament);
  return res.status(201).send(tournament);
});

module.exports = { app, validateGame, validateTournament };
