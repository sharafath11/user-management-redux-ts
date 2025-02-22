import express from "express"
import { checkLoginStatus, LoginController, logoutUser, registerController } from "../controllers/userController/authController";
import { verifyUser } from "../middleware/authMiddleware";
const route = express.Router();
route.get("/check-auth", verifyUser, checkLoginStatus)
route.post("/logout",logoutUser)
route.post("/register", registerController);
route.post("/login",LoginController)
export default route
