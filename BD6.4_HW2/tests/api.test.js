const request = require("supertest");
const { app } = require("../index.js");
const {
  getGames,
  getGameById,
  getGenres,
  getGenreById,
} = require("../games.js");
let http = require("http");

jest.mock("../games.js", () => ({
  ...jest.requireActual("../games.js"),
  getGames: jest.fn(),
  getGameById: jest.fn(),
  getGenres: jest.fn(),
  getGenreById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Error Handling Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /api/games should return 404 if no games are found.", async () => {
    getGames.mockReturnValue([]);

    const response = await request(server).get("/api/games");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("No games found");
  });

  it("GET /api/games/:id should return 404 for non-existent ID", async () => {
    getGameById.mockReturnValue(null);

    const response = await request(server).get("/api/games/999");
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual("Game not found");
  });

  it("GET /api/genres should return 404 if no genres found.", async () => {
    getGenres.mockReturnValue([]);

    const response = await request(server).get("/api/genres");
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual("No genres found");
  });

  it("GET /api/genres/:id should return 404 for non-existent ID", async () => {
    getGenreById.mockReturnValue(null);

    const response = await request(server).get("/api/genres/999");
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual("Genre not found");
  });
});
