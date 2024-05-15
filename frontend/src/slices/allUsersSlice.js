import { createSlice } from "@reduxjs/toolkit";

export const allUsersSlice = createSlice({
    name: "allUsers",
    initialState: {
        items: [],
    },
    reducers: {
        setAllUsers: (state, action) => {
            state.items = action.payload;
        },
    },
})

export const { setAllUsers } = allUsersSlice.actions;
export default allUsersSlice.reducer
