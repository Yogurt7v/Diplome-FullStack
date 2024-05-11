const express = require("express");
const {
  addProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  getProductsWithFilter,
} = require("../controllers/Products");

const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  await addProduct(req.body);
});

router.get("/", async (req, res) => {
  const products = await getProducts();
  res.json(products);
});

router.post("/", async (req, res) => {
  const products = await getProducts(req.body);
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await getSingleProduct(req.params.id);
  res.json(product);
});

router.delete("/:id", async (req, res) => {
  const product = await deleteProduct(req.params.id);
  res.json(product);
});

router.patch("/:id", async (req, res) => {
  const product = await updateProduct(req.params.id, req.body);
  res.json(product);
});

router.post("/withFilter", async (req, res) => {
  const products = await getProductsWithFilter(req.body);
  res.json(products);
});

module.exports = router