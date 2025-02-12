const request = require("supertest");
const { app } = require("../index.js");
const {
  getBooks,
  getBookById,
  getReviews,
  getReviewById,
} = require("../book.js");
let http = require("http");

jest.mock("../book.js", () => ({
  ...jest.requireActual("../book.js"),
  getBooks: jest.fn(),
  getBookById: jest.fn(),
  getReviews: jest.fn(),
  getReviewById: jest.fn(),
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

  it("GET /api/books should return 404 if no books are found.", async () => {
    getBooks.mockReturnValue([]);

    const response = await request(server).get("/api/books");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("No books found");
  });

  it("GET /api/books/:id should return 404 for non-existent ID ", async () => {
    getBookById.mockReturnValue(null);

    const response = await request(server).get("/api/books/999");
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual("Book not found");
  });

  it("GET /api/reviews should return 404 if no reviews found.", async () => {
    getReviews.mockReturnValue([]);

    const response = await request(server).get("/api/reviews");
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual("No reviews found");
  });

  it("GET /api/reviews/:id should return 404 for non-existent ID ", async () => {
    getReviewById.mockReturnValue(null);

    const response = await request(server).get("/api/reviews/999");
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual("Review not found");
  });
});
