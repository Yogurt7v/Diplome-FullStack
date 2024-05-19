import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ROLE } from "../constants/role";
import axios from "axios";

export const fetchUserOrders = createAsyncThunk("user/fetchUserOrders", async(user) => {

    
    const allOrders = await axios.get("/buskets").then((data) => data.data);
    const data = allOrders.filter((order) => order.userId === user);
    return data;
}) 

export const userSlice = createSlice({
    name: "user",
    initialState: {    
        id: null,
        login: null,
        roleId: ROLE.GUEST,
}, 
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.login = action.payload.login;
            state.roleId = action.payload.roleId;

        },
        logout: (state) => {
            state.id = null;
            state.login = null;
            state.roleId = ROLE.GUEST;

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
            state.orders = action.payload
        })
    }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

