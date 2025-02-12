const express = require("express");
const app = express();
app.use(express.json());

let games = [
  {
    id: 1,
    title: "The Legend of Zelda",
    genre: "Adventure",
    developer: "Nintendo",
  },
  {
    id: 2,
    title: "Super Mario Bros",
    genre: "Platformer",
    developer: "Nintendo",
  },
];

let developers = [
  { id: 1, name: "Nintendo", country: "Japan" },
  { id: 2, name: "Valve", country: "USA" },
];

async function getAllGames() {
  return games;
}

async function getGameById(id) {
  return games.find((game) => game.id === id);
}

async function addGame(data) {
  data.id = games.length + 1;
  games.push(data);
  return data;
}

async function getDeveloperById(id) {
  return developers.find((dev) => dev.id === id);
}

async function addDeveloper(dev) {
  dev.id = developers.length + 1;
  developers.push(dev);
  return dev;
}

app.get("/games", async (req, res) => {
  const allGames = await getAllGames();
  res.json(allGames);
});

app.get("/games/details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const game = await getGameById(id);
  if (!game) return res.status(404).send("Game not found");
  res.json(game);
});

app.post("/games/new", async (req, res) => {
  const newGame = await addGame(req.body);
  res.status(201).json(newGame);
});

app.get("/developers/details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const dev = await getDeveloperById(id);
  if (!dev) return res.status(404).send("Developer not found");
  res.json(dev);
});

app.post("/developers/new", async (req, res) => {
  const newDeveloper = await addDeveloper(req.body);
  res.status(201).json(newDeveloper);
});

module.exports = {
  app,
  getAllGames,
  getGameById,
  addGame,
  getDeveloperById,
  addDeveloper,
};
