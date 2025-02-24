import { Request,Response } from "express";
import jwt from "jsonwebtoken"
export const LoginAdmin = (req: Request, res: Response): void => {
    console.log("its working");

    const { email, password } = req.body;
    
    try {
        if (password !== process.env.ADMIN_PASSWORD || email !== process.env.ADMIN_USERNAME) {
            console.log("Invalid credentials");
            res.status(401).json({ ok: false, msg: "Invalid credentials" });
            return;
        }
        const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
        res.cookie("adminToken", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict", 
            maxAge: 3600000, 
        });

        res.json({ ok: true, msg: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: "Server error" });
    }
};