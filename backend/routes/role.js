const express = require("express");
const { getRoles } = require("../controllers/User");

const router = express.Router({ mergeParams: true })

router.get("/", async (req, res) => {
    const roles = await getRoles()
    res.json(roles)
  })


module.exports = router