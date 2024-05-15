import { createSlice } from "@reduxjs/toolkit";
import { ROLE } from "../constants/role";

export const userSlice = createSlice({
    name: "user",
    initialState: {    
        id: null,
        login: null,
        roleId: ROLE.GUEST,
        session: null,
}, 
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.login = action.payload.login;
            state.roleId = action.payload.roleId;
            state.session = action.payload.session;
        },
        logout: (state) => {
            state.id = null;
            state.login = null;
            state.roleId = ROLE.GUEST;
            state.session = null;
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

