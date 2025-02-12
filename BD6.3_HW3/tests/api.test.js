const { getAllRecipes, getRecipeById, addRecipe } = require("../index");

jest.mock("../index", () => ({
  getAllRecipes: jest.fn(),
  getRecipeById: jest.fn(),
  addRecipe: jest.fn(),
}));

describe("Recipe API Tests", () => {
  test("getAllRecipes should return all recipes", () => {
    const mockRecipes = [
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
    getAllRecipes.mockReturnValue(mockRecipes);
    expect(getAllRecipes()).toEqual(mockRecipes);
    expect(getAllRecipes).toHaveBeenCalled();
  });

  test("getRecipeById should return a recipe by ID", () => {
    const mockRecipe = {
      id: 1,
      name: "Spaghetti Bolognese",
      cuisine: "Italian",
      difficulty: "Medium",
    };
    getRecipeById.mockReturnValue(mockRecipe);
    expect(getRecipeById(1)).toEqual(mockRecipe);
    expect(getRecipeById).toHaveBeenCalledWith(1);
  });

  test("getRecipeById should return null for non-existent ID", () => {
    getRecipeById.mockReturnValue(null);
    expect(getRecipeById(999)).toBeNull();
    expect(getRecipeById).toHaveBeenCalledWith(999);
  });

  test("addRecipe should add a new recipe", () => {
    const newRecipe = {
      id: 3,
      name: "Sushi",
      cuisine: "Japanese",
      difficulty: "Hard",
    };
    addRecipe.mockReturnValue(newRecipe);
    expect(addRecipe(newRecipe)).toEqual(newRecipe);
    expect(addRecipe).toHaveBeenCalledWith(newRecipe);
  });
});

