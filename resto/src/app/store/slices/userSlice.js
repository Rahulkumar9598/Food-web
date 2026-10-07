import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log(action.payload, "form the store ")
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
        },

        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.isLoading = false;
        },
    },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;