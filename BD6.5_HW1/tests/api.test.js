const request = require("supertest");
const { app, validateGame, validateTournament } = require("../index");
const http = require("http");

let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen(3000);
});

afterAll(() => {
  server.close();
});

// < ------------------ For APIs Endpoints ------------------ >

describe("API Endpoints to add data", () => {
  // < ------------------ Add a Game ------------------ >
  it("should add a game with valid input", async () => {
    const res = await request(server).post("/api/games").send({
      title: "The Legend of Zelda",
      genre: "Adventure",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      title: "The Legend of Zelda",
      genre: "Adventure",
    });
  });

  // Invalid Game Input
  it("should return 400 for invalid game input", async () => {
    const res = await request(server).post("/api/games").send({
      title: "The Legend of Zelda",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      error: "Genre is required and should be string.",
    });
  });

  // < ------------------ Add a Tournament ------------------ >
  it("should add a tournament with valid input", async () => {
    const res = await request(server).post("/api/tournaments").send({
      name: "Zelda Championship",
      gameId: 1,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: "Zelda Championship",
      gameId: 1,
    });
  });

  // Invalid Tournament Input
  it("should return 400 for invalid tournament input", async () => {
    const res = await request(server).post("/api/tournaments").send({
      name: "Zelda Championship",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      error: "Game ID is required and should be number.",
    });
  });
});

// < ------------------ For Validation Functions ------------------ >
describe("Validate Functions", () => {
  // < ------------------ Validate a Game ------------------ >
  it("should validate game input correctly", () => {
    expect(
      validateGame({ title: "The Legend of Zelda", genre: "Adventure" }),
    ).toBeNull();
    expect(validateGame({ title: "The Legend of Zelda" })).toEqual(
      "Genre is required and should be string.",
    );
    expect(validateGame({ genre: "Adventure" })).toEqual(
      "Title is required and should be string.",
    );
  });

  // < ------------------ Validate a Tournament ------------------ >
  it("should validate tournament input correctly", () => {
    expect(
      validateTournament({ name: "Zelda Championship", gameId: 1 }),
    ).toBeNull();
    expect(validateTournament({ name: "Zelda Championship" })).toEqual(
      "Game ID is required and should be number.",
    );
    expect(validateTournament({ gameId: 1 })).toEqual(
      "Tournament name is required and should be string.",
    );
  });
});
