import axios from "axios";

function transformProducts (dbProducts) {
    return {
    id: dbProducts._id,
    productName: dbProducts.productName,
    description: dbProducts.description,
    image_url: dbProducts.image_url,
    category: dbProducts.category,
    weight: dbProducts.weight,
    calories: dbProducts.calories,
    ingredients: dbProducts.ingredients,
    price: dbProducts.price
    }
}


export const getSingleProduct = async (productId) => {
  const res = await fetch(`/products/${productId}`,{
    method: "POST",
  });


  const loadedProduct = await res.json();
  return loadedProduct ? transformProducts(loadedProduct) : null;
};
