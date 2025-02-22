import { Request, Response } from "express";
import userModel from "../../models/userModel";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const registerController = async (req: Request, res: Response):Promise<void> => {
    const { name, place, phoneNumber, email, password } = req.body;
    try {

        if (!name || !email || !place || !password || !phoneNumber) {
            res.json({ ok: false, msg: "All fields are necessary" });
            return
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            res.json({ ok: false, msg: "Email already exists" });
            return
        }
        const hashPassword=await bcrypt.hash(password,10)
        const newUser = new userModel({ name, place, email, password:hashPassword, phoneNumber });
        await newUser.save();
        res.json({ ok: true, msg: "User registered successfully" });
    } catch (error) {
        console.error(error)
        res.status(500).json({ ok: false, msg: "Server error" });
    }
};
export const LoginController = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            res.json({ ok: false, msg: "Invalid credentials" });
            return;
        }

        const confirmPassword = await bcrypt.compare(password, user.password)
        if (!confirmPassword) {
            res.json({ ok: false, msg: "Invalid credentials" });
            return;
        }
        const token = jwt.sign(
            { role: "user", userId: user._id }, 
            process.env.JWT_SECRET as string, 
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict", 
        });
        res.json({ ok: true, msg: "Login successfully",user,token });
    } catch (error) {
        console.error(error);
        res.json({ ok: false, msg: "Server error" });
    }
};
export const logoutUser = (req: Request, res: Response) => {
    try {
        res.clearCookie("token"); 
        res.status(200).json({ ok: true, msg: "Logged out successfully" });
        return
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Server error, try again" });
        return
    }
};


export const checkLoginStatus = (req: Request, res: Response) => {
    if (!(req as any).user) {
        res.json({ ok: false, msg: "Please login" });
        return
    }

    res.json({ ok: true, user: (req as any).user });
};
