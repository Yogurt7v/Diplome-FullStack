const express = require("express");
const {
  getSession,
  addSession,
  deleteSession,
} = require("../controllers/Sessions");

const router = express.Router({ mergeParams: true });

router.get("/:id", async (req, res) => {
  const session = await getSession(req.params.id);
  res.json(session);
});

router.post("/", async (req, res) => {
  const session = await addSession(req.body.hash, req.body.user);
  res.json(session);
});

router.delete("/:id", async (req, res) => {
  const session = await deleteSession(req.params.id);
  res.json(session);
});

module.exports = router;
