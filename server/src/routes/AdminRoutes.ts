import express, { Router } from "express";
import { LoginAdmin } from "../controllers/adminController/adminAuth";
import { adminLogout, editUser, getUser } from "../controllers/adminController/adminController";
import { verifyAdmin } from "../middleware/verifyAdmin";
const route: Router = express.Router();
route.post("/login", LoginAdmin)
route.get("/get-users",verifyAdmin, getUser);
route.post("/update-user", editUser);
route.get("/logout",adminLogout)
export default route