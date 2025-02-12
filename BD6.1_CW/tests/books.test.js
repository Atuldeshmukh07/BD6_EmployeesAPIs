const { describe } = require("node:test");
let { getBooks, getBookById, addBook } = require("../book");

describe("Books Function", () => {
  it("should get all boooks", () => {
    let books = getBooks();
    expect(books.length).toBe(4);
    expect(books).toEqual([
      { id: 1, title: 1984, author: "George Orwell" },
      { id: 2, title: "Brave New World", author: "Aldous Huxley" },
      { id: 3, title: "Fahrenheit 451", author: "Ray Bradbury" },
      { id: 4, title: "To Kill a Mockingbird", author: "Harper Lee" },
    ]);
  });

  it("should return a book by id", () => {
    let book = getBookById(1);
    expect(book).toEqual({ id: 1, title: 1984, author: "George Orwell" });
  });
  it("should return undefined for a non-existant book", () => {
    let book = getBookById(99);
    expect(book).toBeUndefined();
  });
  it("should add a book", () => {
    let newbook = { title: "New Book", author: "Author Name" };
    let addedBook = addBook(newbook);
    expect(addedBook).toEqual({
      id: 5,
      title: "New Book",
      author: "Author Name",
    });
    const books = getBooks();
    expect(books.length).toBe(5);
  });
});
