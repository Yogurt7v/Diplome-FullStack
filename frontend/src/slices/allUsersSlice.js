import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersFetch } from "../fetchs/getUsers";
import { removeUserFetch} from "../fetchs/removeUser";



export const allUsersFetch = createAsyncThunk("allUsers/allUsersFetch", async() => {
    const data = await getUsersFetch();
    return data;
}) 

export const deleteUserFetch = createAsyncThunk("allUsers/deleteUserFetch", async(id) => {
    removeUserFetch(id);
    const data = await getUsersFetch();
    return data;

})

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
    extraReducers: (builder) => {
        builder.addCase(allUsersFetch.fulfilled, (state, action) => {
            state.items = action.payload;
        })

        builder.addCase(deleteUserFetch.fulfilled, (state, action) => {
            state.items = action.payload;
        })
    }

})

export const { setAllUsers } = allUsersSlice.actions;
export default allUsersSlice.reducer
