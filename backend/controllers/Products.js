const Product = require("../models/Product.js");

async function addProduct(productData) {
  const product = await Product.create(productData);
  console.log("New product created");
  return product;
}

async function getProducts(searchPhrase, searchCategory) {
  if (!searchPhrase && !searchCategory) {
    const products = await Product.find();
    return products;
  }
  if (searchPhrase && !searchCategory) {
    5;
    const products = await Product.find({
      productName: { $regex: searchPhrase, $options: "i" },
    });
    return products;
  }
}

async function getSingleProduct(id) {
  const product = await Product.findById(id);
  return product;
}

async function deleteProduct(id) {
  const product = await Product.findByIdAndDelete(id);
  return product;
}

async function updateProduct(id, productData) {
  const product = await Product.findByIdAndUpdate(id, productData);
  console.log("Product updated", product.productName);
  return product;
}

module.exports = {
  addProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
