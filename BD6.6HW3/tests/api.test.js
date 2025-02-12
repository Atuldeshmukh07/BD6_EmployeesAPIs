const request = require("supertest");
const http = require("http");
const { getAllBooks, getBookById } = require("../controllers");
const { app } = require("../index");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllBooks: jest.fn(),
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

  it("should return all books", async () => {
    let mockedBooks = [
      {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
      {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
    ];

    getAllBooks.mockReturnValue(mockedBooks);
    let result = getAllBooks();
    expect(result).toEqual(mockedBooks);
    expect(result.length).toBe(3);
  });
});

describe("API Endpoints for Books", () => {
  it("GET /books should get all books", async () => {
    const res = await request(server).get("/books");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      books: [
        {
          bookId: 1,
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          genre: "Fiction",
        },
        {
          bookId: 2,
          title: "1984",
          author: "George Orwell",
          genre: "Dystopian",
        },
        {
          bookId: 3,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          genre: "Classic",
        },
      ],
    });
    expect(res.body.books.length).toBe(3);
  });

  it("GET /books/details/:id should get book by id", async () => {
    const res = await request(server).get("/books/details/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      book: {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
    });
  });
});
