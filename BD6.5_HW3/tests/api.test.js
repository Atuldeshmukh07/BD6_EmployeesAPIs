const request = require("supertest");
const { app, validateArticle, validateAuthor } = require("../index");
const http = require("http");

let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen(3000);
});

afterAll(() => {
  server.close();
});

// < ------------------ For API Endpoints ------------------ >

describe("API Endpoints for Articles and Authors", () => {
  // < ------------------ Add a New Article ------------------ >
  it("should add an article with valid input", async () => {
    const res = await request(server).post("/articles").send({
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 3,
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });
  });

  // Invalid Article Input
  it("should return 400 for invalid article input", async () => {
    const res = await request(server).post("/articles").send({
      title: "Incomplete Article",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      error: "Content is required and should be a string.",
    });
  });

  // < ------------------ Add a New Author ------------------ >
  it("should add an author with valid input", async () => {
    const res = await request(server).post("/authors").send({
      name: "Alice Johnson",
      articleId: 3,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 3,
      name: "Alice Johnson",
      articleId: 3,
    });
  });

  // Invalid Author Input
  it("should return 400 for invalid author input", async () => {
    const res = await request(server).post("/authors").send({
      name: "Alice Johnson",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      error: "Article ID is required and should be a number.",
    });
  });
});

// < ------------------ For Validation Functions ------------------ >

describe("Validation Functions", () => {
  // < ------------------ Validate Article ------------------ >
  it("should validate article input correctly", () => {
    expect(
      validateArticle({
        title: "Mastering Node.js",
        content: "Node.js is a powerful tool for backend development...",
      }),
    ).toBeNull();

    expect(validateArticle({ title: "Mastering Node.js" })).toEqual(
      "Content is required and should be a string.",
    );

    expect(validateArticle({ content: "Node.js is great!" })).toEqual(
      "Title is required and should be a string.",
    );
  });

  // < ------------------ Validate Author ------------------ >
  it("should validate author input correctly", () => {
    expect(
      validateAuthor({
        name: "Alice Johnson",
        articleId: 3,
      }),
    ).toBeNull();

    expect(validateAuthor({ name: "Alice Johnson" })).toEqual(
      "Article ID is required and should be a number.",
    );

    expect(validateAuthor({ articleId: 3 })).toEqual(
      "Author name is required and should be a string.",
    );
  });
});
