import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../utils/Interfaces";

const user: IUser | null = JSON.parse(localStorage.getItem("user") || "null");

const initialState: IUser = {
    name: user?.name || "",
    place: user?.place || "",
    phoneNumber: user?.phoneNumber || 0,
    email: user?.email || "",
    loggedIn: user?.loggedIn as boolean || false,
    image: user?.image || "" 
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            if (action.payload.isLogged) {
                state.loggedIn = true;
                return;
            }
            const { name, place, phoneNumber, email, image } = action.payload;
            state.name = name;
            state.place = place;
            state.phoneNumber = phoneNumber;
            state.email = email;
            state.image = image;
            state.loggedIn = true;

           
            localStorage.setItem("user", JSON.stringify({ 
                name, place, phoneNumber, email, image, loggedIn: true 
            }));
        },
        logout: (state) => {
            state.name = "";
            state.place = "";
            state.phoneNumber="";
            state.email = "";
            state.image = ""; 
            state.loggedIn = false;
            localStorage.removeItem("user");
        },
        updateUser: (state, action) => {
            state.name = action.payload.name;
            state.image = action.payload.image;
            state.phoneNumber = action.payload.phoneNumber;

            localStorage.setItem("user", JSON.stringify({
                name: state.name,
                place: state.place, 
                phoneNumber: state.phoneNumber,
                email: state.email, 
                image: state.image,
                loggedIn: state.loggedIn
            }));
        }
    },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
