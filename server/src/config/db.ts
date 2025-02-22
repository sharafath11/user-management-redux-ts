import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
export const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI
    try {
        await mongoose.connect(MONGO_URI as string)
        console.log("db connected succesfully")
    } catch (error) {
        console.error(error)
        process.exit(1);
    }
}