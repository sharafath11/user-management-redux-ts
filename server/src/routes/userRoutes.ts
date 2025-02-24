import express from "express"
import { checkLoginStatus, LoginController, logoutUser, registerController } from "../controllers/userController/authController";
import { verifyUser } from "../middleware/authMiddleware";
import { editUserDetails } from "../controllers/userController/editController";
import {upload} from "../middleware/multer";
const route = express.Router();
route.get("/check-auth", verifyUser, checkLoginStatus)
route.post("/logout",logoutUser)
route.post("/register", registerController);
route.post("/login", LoginController);
route.post("/edit", upload.single("image"), editUserDetails)
export default route
