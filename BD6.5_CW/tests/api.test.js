const request = require("supertest");
const { app, validateBook, validateUser, validateReview } = require("../index");
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
  // < ------------------ Add a User ------------------ >
  it("should add a user with valid input", async () => {
    const res = await request(server).post("/api/users").send({
      name: "John Doe",
      email: "johndoe@example.com",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
    });
  });

  // Invalid User Input
  it("should return 400 from invalid user input", async () => {
    const res = await request(server).post("/api/users").send({
      name: "John",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      error: "Email is required and should be string.",
    });
  });

  // < ------------------ Add a Book ------------------ >
  it("should add a book with valid input", async () => {
    const res = await request(server).post("/api/books").send({
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
    });
  });

  // Invalid Book Input
  it("should return 400 from invalid book input", async () => {
    const res = await request(server).post("/api/books").send({
      title: "The Great Gatsby",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      error: "Author is required and should be string.",
    });
  });

  // < ------------------ Add a review ------------------ >
  it("should add a review with valid input", async () => {
    const res = await request(server).post("/api/reviews").send({
      content: "Great book!",
      userId: 1,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      content: "Great book!",
      userId: 1,
    });
  });

  // Invalid Book Input
  it("should return 400 from invalid review input", async () => {
    const res = await request(server).post("/api/reviews").send({
      content: "Great book!",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      error: "User id is required and should be number.",
    });
  });
});

// < ------------------ For Functions Endpoints ------------------ >
describe("Validate Functions", () => {
  // < ------------------ Validate a User ------------------ >
  it("should validate user input correctly", () => {
    expect(
      validateUser({
        name: "John Doe",
        email: "johndoe@example.com",
      }),
    ).toBeNull();

    expect(validateUser({ name: "John Doe" })).toEqual(
      "Email is required and should be string.",
    );

    expect(validateUser({ email: "johndoe@example.com" })).toEqual(
      "Name is required and should be string.",
    );
  });

  // < ------------------ Validate a Book ------------------ >
  it("should validate book input correctly", () => {
    expect(
      validateBook({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
      }),
    ).toBeNull();

    expect(validateBook({ title: "The Great Gatsby" })).toEqual(
      "Author is required and should be string.",
    );

    expect(validateBook({ author: "F. Scott Fitzgerald" })).toEqual(
      "Title is required and should be string.",
    );
  });

  // < ------------------ Validate a Review ------------------ >
  it("should validate review input correctly", () => {
    expect(
      validateReview({
        content: "Great book!",
        userId: 1,
      }),
    ).toBeNull();

    expect(validateReview({ content: "Great book!" })).toEqual(
      "User id is required and should be number.",
    );

    expect(validateReview({ userId: 1 })).toEqual(
      "Review content is required and should be string.",
    );
  });
});
