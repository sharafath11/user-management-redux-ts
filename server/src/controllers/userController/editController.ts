import { Request, Response } from "express";
import userModel from "../../models/userModel";
import jwt from "jsonwebtoken";


export const editUserDetails = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
             res.status(401).json({ ok: false, msg: "Unauthorized: No token provided" });
             return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

        const { name, phoneNumber } = req.body;
        const imagePath = req.file ? `uploads/${req.file.filename}` : undefined;
        

        const updatedUser = await userModel.findByIdAndUpdate(
            decoded.userId,
            { $set: { name, phoneNumber, ...(imagePath && { image: imagePath }) } },
            { new: true, runValidators: true }
        );
        if (updatedUser?.isBlocked) {
            res.json({ ok: false, msg: "this account was blocked" });
            return
        }
        if (!updatedUser) {
            res.status(404).json({ ok: false, msg: "User not found" });
            return
        }

        res.status(200).json({ ok: true, msg: "User details updated successfully", imageUrl: updatedUser.image });
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
