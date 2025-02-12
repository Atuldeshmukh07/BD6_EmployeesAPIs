const request = require("supertest");
const { app } = require("../index.js");
const {
  getArticles,
  getArticleById,
  getComments,
  getCommentById,
  getUserById,
} = require("../articles.js");
let http = require("http");

jest.mock("../articles.js", () => ({
  ...jest.requireActual("../articles.js"),
  getArticles: jest.fn(),
  getArticleById: jest.fn(),
  getComments: jest.fn(),
  getCommentById: jest.fn(),
  getUserById: jest.fn(),
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

  it("GET /articles should return 404 if no articles are found.", async () => {
    getArticles.mockReturnValue([]);

    const response = await request(server).get("/articles");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("No articles found");
  });

  it("GET /articles/:id should return 404 for non-existent ID", async () => {
    getArticleById.mockReturnValue(null);

    const response = await request(server).get("/articles/999");
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual("Article not found");
  });

  it("GET /comments should return 404 if no comments are found.", async () => {
    getComments.mockReturnValue([]);

    const response = await request(server).get("/comments");
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual("No comments found");
  });

  it("GET /comments/:id should return 404 for non-existent ID", async () => {
    getCommentById.mockReturnValue(null);

    const response = await request(server).get("/comments/999");
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual("Comment not found");
  });

  it("GET /users/:id should return 404 for non-existent ID", async () => {
    getUserById.mockReturnValue(null);

    const response = await request(server).get("/users/999");
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual("User not found");
  });
});
