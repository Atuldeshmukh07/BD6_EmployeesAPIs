let books = [
  { id: 1, title: 1984, author: "George Orwell" },
  { id: 2, title: "Brave New World", author: "Aldous Huxley" },
  { id: 3, title: "Fahrenheit 451", author: "Ray Bradbury" },
  { id: 4, title: "To Kill a Mockingbird", author: "Harper Lee" },
];

function getBooks() {
  return books;
}

function getBookById(id) {
  return books.find((book) => book.id === id);
}

function addBook(book) {
  let newBook = { id: books.length + 1, ...book };
  books.push(newBook);
  return newBook;
}

module.exports = { getBooks, getBookById, addBook };
