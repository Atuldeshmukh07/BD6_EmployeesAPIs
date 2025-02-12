const express = require("express");
const app = express();
app.use(express.json());

let recipes = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    cuisine: "Italian",
    difficulty: "Medium",
  },
  {
    id: 2,
    name: "Chicken Tikka Masala",
    cuisine: "Indian",
    difficulty: "Hard",
  },
];

async function getAllRecipes() {
  return recipes;
}

async function getRecipeById(id) {
  return recipes.find((recipe) => recipe.id === id);
}

async function addRecipe(data) {
  data.id = recipes.length + 1;
  recipes.push(data);
  return data;
}

app.get("/recipes", async (req, res) => {
  const allRecipes = await getAllRecipes();
  res.json(allRecipes);
});

app.get("/recipes/details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const recipe = await getRecipeById(id);
  if (!recipe) return res.status(404).send("Recipe not found");
  res.json(recipe);
});

app.post("/recipes/new", async (req, res) => {
  const newRecipe = await addRecipe(req.body);
  res.status(201).json(newRecipe);
});

module.exports = {
  app,
  getAllRecipes,
  getRecipeById,
  addRecipe,
};
