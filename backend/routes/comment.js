const express = require("express");
const {
  getComments,
  addComment,
  deleteComment,
} = require("../controllers/Comments");

const router = express.Router({ mergeParams: true });

router.get("/:id", async (req, res) => {
  const comments = await getComments(req.params.id);
  res.json(comments);
});

router.post("/", async (req, res) => {
  const comments = await addComment(req.body);
  res.json(comments);
});

router.delete("/:id", async (req, res) => {
  const comments = await deleteComment(req.params.id);
  res.json(comments);
});

module.exports = router;
