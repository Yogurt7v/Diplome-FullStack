const express = require("express");
const {
    addImages
  } = require("../controllers/Images");

  const router = express.Router({ mergeParams: true });


  router.post("/", async (req, res) => {

    const {base64} = req.body
    const image = await addImages(base64);
    res.json(image);
  });
  

  module.exports = router;