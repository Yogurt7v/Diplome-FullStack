const express = require("express");
const { getPromocodes, checkPromocode } = require("../controllers/Promocodes");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const promocodes = await getPromocodes();
  res.json(promocodes);
});

router.get("/:id", async (req, res) => {
  const promocode = await checkPromocode(req.params.id);
  res.json(promocode);
});

module.exports = router;
