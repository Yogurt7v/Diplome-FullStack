export const getAllProducts = async () => {
    const response = await fetch("/products");
    const res = await response.json();
    return res;
};
