import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import adminRoute from "../src/routes/AdminRoutes"
import userRoutes from "../src/routes/userRoutes"
import { connectDB } from "./config/db";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
const app = express();
dotenv.config()
const PORT = 4000;
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use(
    cors({
      origin: "http://localhost:5173", 
      credentials: true, 
    })
  );
connectDB()
app.use("/",userRoutes)
app.use("/admin",adminRoute)
app.listen(PORT,() => {
    console.log(`server running on ${PORT}`)
})
