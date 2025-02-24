import { configureStore } from "@reduxjs/toolkit";
import reducer from "./authSlice";
import adminReducer from "../redux/adminSlice"
export const store = configureStore({
    reducer:{
        auth: reducer,
        admin:adminReducer
    }
})