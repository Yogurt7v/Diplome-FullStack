const express = require("express");
const {
    addImages, getAllImagesFetch, deleteImageFetch
  } = require("../controllers/Images");

  const router = express.Router({ mergeParams: true });


  router.post("/", async (req, res) => {

    const {base64} = req.body
    const image = await addImages(base64);
    res.json(image);
  });

  router.post("/allImages", async (req, res) => {
    const images = await getAllImagesFetch();
    res.json(images);
  });

  router.delete("/:id", async (req, res) => {
    const image = await deleteImageFetch(req.params.id);
    res.json(image);
  });
  

  module.exports = router;