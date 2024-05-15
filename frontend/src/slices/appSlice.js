import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        wasLogout:false,
        modal:{
            isOpen:false,
            text:"",
            onConform: () => {},
            onCancel:() => {},
        }
    },
    reducers: {
        logout: (state) => {
            state.wasLogout = !state.wasLogout;
        },
        openModal: (state, action) => {
            state.modal = {
                ...state.modal,
                ...action.payload,
                isOpen: true
            }
        },
        closeModal: (state) => {
            state.modal = {
                ...state.modal,
                isOpen: false
            }
        },
    },
});

export const { logout, openModal, closeModal } = appSlice.actions;

export default appSlice.reducer;