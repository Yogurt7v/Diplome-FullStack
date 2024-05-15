import { createSlice } from "@reduxjs/toolkit";

export const busketSlice = createSlice({
    name: "busket",
    initialState: {
        items: [],
    },
    reducers: {
        addBusketData: (state, action) => {
            state.items = [...state.items, action.payload];
        },
        removeBusketData: (state, action) => {
            state.items = state.items.filter(
                (item) => item.randomId !== action.payload
            );
        },
        clearBusketData: (state) => {
            state.items = [];
        },
    },
});

export const { addBusketData, removeBusketData, clearBusketData } =
    busketSlice.actions;
export default busketSlice.reducer