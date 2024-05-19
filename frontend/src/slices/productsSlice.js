import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../fetchs/getAllProducts";


export const allProductsFetch = createAsyncThunk("products/allProductsFetch", async() => {
    const data = await getAllProducts();
    return data;
}) 

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        isLoading: true,
    },
    reducers: {
        addProductsData: (state, action) => {
            state.items = [action.payload];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(allProductsFetch.fulfilled, (state, action) => {
            state.items = action.payload
            state.isLoading = false
        })
    }
})

export const { addProductsData } = productsSlice.actions;
export default productsSlice.reducer