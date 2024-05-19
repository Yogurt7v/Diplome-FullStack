import axios from "axios";

export const addProductFetch = async ({
  productName,
  image_url,
  description,
  category,
  price,
  weight,
  calories,
  ingredients,
}) => {
  axios.post("/products", {
    productName,
    image_url,
    description,
    weight,
    calories,
    ingredients,
    category,
    price,
  });
};
