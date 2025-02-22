import express, { Router } from "express";
import { LoginAdmin } from "../controllers/adminController/adminAuth";
const route: Router = express.Router();
route.post("/login", LoginAdmin)
export default route