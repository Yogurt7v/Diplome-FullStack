const express = require("express");
const {
  getBusket,
  addBusket,
  deleteBusket,
  updateBusket,
  getBusketById,
} = require("../controllers/Buskets");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const buskets = await getBusket();
  res.json(buskets);
});

router.post("/", async (req, res) => {
  const busket = await addBusket(req.body);
  res.json(busket);
});

router.delete("/:id", async (req, res) => {
  const busket = await deleteBusket(req.params.id);
  res.json(busket);
});

router.patch("/:id", async (req, res) => {
  const busket = await updateBusket(req.params.id, req.body);
  res.json(busket);
});

router.get("/:id", async (req, res) => {
  const busket = await getBusketById(req.params.id);
  res.json(busket);
});

module.exports = router;
