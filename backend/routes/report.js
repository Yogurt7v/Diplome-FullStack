const express = require("express");
const {
  getReports,
  addReport,
  deleteReport,
} = require("../controllers/Reports");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const reports = await getReports();
  res.json(reports);
});

router.post("/", async (req, res) => {
  await addReport(req.body.userId, req.body.text);
  console.log("addReport");
});

router.delete("/:id", async (req, res) => {
  const reports = await deleteReport(req.params.id);
  res.json(reports);
});

module.exports = router;
