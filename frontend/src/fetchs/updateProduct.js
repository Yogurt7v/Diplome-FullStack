import axios from "axios";

export const updatedProductFetch = async ({ id, productName, image_url, description, weight, calories, ingredients, category, price }) =>{

  const updatedProduct = await axios.patch(`/products/${id}`, {
    productName: productName,
    description: description,
    category: category,
    weight: weight,
    calories: calories,
    ingredients: ingredients,
    price: price,
    image_url: image_url,
  })
  return updatedProduct
}
