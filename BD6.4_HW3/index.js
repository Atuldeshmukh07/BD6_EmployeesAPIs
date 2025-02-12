let {
  getArticles,
  getArticleById,
  getComments,
  getCommentById,
  getUserById,
} = require("./articles");
const express = require("express");
const app = express();
app.use(express.json());

// Exercise 1: Get All Articles
app.get("/articles", async (req, res) => {
  try {
    const articles = await getArticles();
    if (articles.length === 0) {
      return res.status(404).json({ error: "No articles found" });
    }
    return res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Exercise 2: Get Article by ID
app.get("/articles/:id", async (req, res) => {
  try {
    const article = await getArticleById(parseInt(req.params.id));
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Exercise 3: Get All Comments
app.get("/comments", async (req, res) => {
  try {
    const comments = await getComments();
    if (comments.length === 0) {
      return res.status(404).json({ error: "No comments found" });
    }
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Exercise 4: Get Comment by ID
app.get("/comments/:id", async (req, res) => {
  try {
    const comment = await getCommentById(parseInt(req.params.id));
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Exercise 5: Get User by ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await getUserById(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { app };
