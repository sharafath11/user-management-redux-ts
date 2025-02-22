import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../utils/Interfaces";

const user: IUser | null = JSON.parse(localStorage.getItem("user") || "null");

const initialState: IUser = {
    name: user?.name || "",
    place: user?.place || "",
    phoneNumber: user?.phoneNumber || 0,
    email: user?.email || "",
    loggedIn: false,
    image:""
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            
            if (action.payload.isLogged) {
                state.loggedIn = true
                return 
            }
            const { name, place, phoneNumber, email } = action.payload.user;
            state.name = name;
            state.place = place;
            state.phoneNumber = phoneNumber;
            state.email = email;
            state.loggedIn=true
            localStorage.setItem("user", JSON.stringify({ name, place, phoneNumber, email,loggedIn:true }));
        },
        logout: (state) => {
            state.name = "";
            state.place = "";
            state.phoneNumber = 0;
            state.email = "";
            state.loggedIn = false;
            localStorage.removeItem("user");
        },
    },
});

export const { login,logout } = authSlice.actions;
export default authSlice.reducer;
