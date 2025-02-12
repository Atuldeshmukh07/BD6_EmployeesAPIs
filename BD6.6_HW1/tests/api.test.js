const request = require("supertest");
const http = require("http");
const { getAllMovies, getMovieById } = require("../controllers");
const { app } = require("../index");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllMovies: jest.fn(),
  getMovieById: jest.fn(),
}));

let server;
beforeAll(() => {
  server = http.createServer(app);
  server.listen(3000);
});

afterAll(() => {
  server.close();
});

describe("Controller function tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all movies", async () => {
    let mockedMovies = [
      {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
      {
        movieId: 2,
        title: "The Shawshank Redemption",
        genre: "Drama",
        director: "Frank Darabont",
      },
      {
        movieId: 3,
        title: "The Godfather",
        genre: "Crime",
        director: "Francis Ford Coppola",
      },
    ];

    getAllMovies.mockReturnValue(mockedMovies);
    let result = getAllMovies();
    expect(result).toEqual(mockedMovies);
    expect(result.length).toBe(3);
  });

  it("should return a movie by ID", async () => {
    let mockedMovie = {
      movieId: 1,
      title: "Inception",
      genre: "Sci-Fi",
      director: "Christopher Nolan",
    };

    getMovieById.mockReturnValue(mockedMovie);
    let result = getMovieById(1);
    expect(result).toEqual(mockedMovie);
    expect(result.movieId).toBe(1);
  });
});

describe("API Endpoints for Movies", () => {
  it("GET /movies should get all movies", async () => {
    const res = await request(server).get("/movies");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      movies: [
        {
          movieId: 1,
          title: "Inception",
          genre: "Sci-Fi",
          director: "Christopher Nolan",
        },
        {
          movieId: 2,
          title: "The Shawshank Redemption",
          genre: "Drama",
          director: "Frank Darabont",
        },
        {
          movieId: 3,
          title: "The Godfather",
          genre: "Crime",
          director: "Francis Ford Coppola",
        },
      ],
    });
    expect(res.body.movies.length).toBe(3);
  });

  it("GET /movies/details/:id should get a movie by id", async () => {
    const res = await request(server).get("/movies/details/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      movie: {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
    });
  });
});
