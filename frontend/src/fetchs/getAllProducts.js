export const getAllProducts = async (searchPhrase, searchCategory) => {
  if (!searchPhrase && !searchCategory) {
    const response = await fetch("/products");
    const res = await response.json();
    return res;
  }
  if (searchPhrase || searchCategory) {
    const params = { searchPhrase, searchCategory };
    const response = await fetch("/products/data/filter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const res = await response.json();
    return res;
  }
};
