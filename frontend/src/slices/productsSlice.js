import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
    },
    reducers: {
        addProductsData: (state, action) => {
            state.items = [...action.payload];
        },
    }
})

export const { addProductsData } = productsSlice.actions;
export default productsSlice.reducer