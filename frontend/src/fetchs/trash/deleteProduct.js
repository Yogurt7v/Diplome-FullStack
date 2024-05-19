export const deleteProductFetch = (id) =>
  fetch(`/products/${id}`, {
    method: "DELETE",
  });
