let articles = [
  { id: 1, title: "Introduction to JavaScript", author: "Jane Smith" },
  { id: 2, title: "Advanced CSS Techniques", author: "Tom Brown" },
];

let comments = [{ id: 1, articleId: 1, content: "Very informative article!" }];

let users = [{ id: 1, name: "Alice Johnson", email: "alice@example.com" }];

function getArticles() {
  return articles;
}

function getArticleById(id) {
  return articles.find((article) => article.id === id);
}

function getCommentsByArticleId(id) {
  return comments.filter((comment) => comment.articleId === id);
}

function getUsersByCommentId(id) {
  return users.filter((user) => user.id === id);
}
module.exports = {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  getUsersByCommentId,
};
