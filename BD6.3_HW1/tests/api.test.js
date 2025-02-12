const {
  getAllGames,
  getGameById,
  addGame,
  getDeveloperById,
  addDeveloper,
} = require("../index");

jest.mock("../index", () => ({
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
  addGame: jest.fn(),
  getDeveloperById: jest.fn(),
  addDeveloper: jest.fn(),
}));

describe("Game API Tests", () => {
  test("getAllGames should return all games", () => {
    const mockGames = [
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
    getAllGames.mockReturnValue(mockGames);
    expect(getAllGames()).toEqual(mockGames);
    expect(getAllGames).toHaveBeenCalled();
  });

  test("getGameById should return a game by ID", () => {
    const mockGame = {
      id: 1,
      title: "The Legend of Zelda",
      genre: "Adventure",
      developer: "Nintendo",
    };
    getGameById.mockReturnValue(mockGame);
    expect(getGameById(1)).toEqual(mockGame);
    expect(getGameById).toHaveBeenCalledWith(1);
  });

  test("getGameById should return null for non-existent ID", () => {
    getGameById.mockReturnValue(null);
    expect(getGameById(999)).toBeNull();
    expect(getGameById).toHaveBeenCalledWith(999);
  });

  test("addGame should add a new game", () => {
    const newGame = {
      id: 3,
      title: "Half-Life",
      genre: "FPS",
      developer: "Valve",
    };
    addGame.mockReturnValue(newGame);
    expect(addGame(newGame)).toEqual(newGame);
    expect(addGame).toHaveBeenCalledWith(newGame);
  });
});

describe("Developer API Tests", () => {
  test("getDeveloperById should return a developer by ID", () => {
    const mockDeveloper = { id: 1, name: "Nintendo", country: "Japan" };
    getDeveloperById.mockReturnValue(mockDeveloper);
    expect(getDeveloperById(1)).toEqual(mockDeveloper);
    expect(getDeveloperById).toHaveBeenCalledWith(1);
  });

  test("getDeveloperById should return null for non-existent ID", () => {
    getDeveloperById.mockReturnValue(null);
    expect(getDeveloperById(999)).toBeNull();
    expect(getDeveloperById).toHaveBeenCalledWith(999);
  });

  test("addDeveloper should add a new developer", () => {
    const newDeveloper = { id: 3, name: "Epic Games", country: "USA" };
    addDeveloper.mockReturnValue(newDeveloper);
    expect(addDeveloper(newDeveloper)).toEqual(newDeveloper);
    expect(addDeveloper).toHaveBeenCalledWith(newDeveloper);
  });
});
