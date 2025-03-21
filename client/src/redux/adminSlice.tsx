import { createSlice } from "@reduxjs/toolkit"
import { IAdmin } from "../utils/Interfaces";

const initialState:IAdmin = {
    admin:false
}
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        adminLogin: (state) => {
            state.admin=true
        },
        adminLogout: (state) => {
            state.admin=false
        }
    }
})
export const { adminLogin,adminLogout } = adminSlice.actions;
export default adminSlice.reducer