import axios from "axios";

export const getAllProducts = async () => {
    const response = await axios.get("/products");
    return response.data;

};
