import { Request, Response } from "express";
import userModel from "../../models/userModel";

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await userModel.find();
        res.json({ ok: true, msg: "User fetched successfully", user });
    } catch (error) {
        console.error(error);
        res.json({ ok: false, msg: "Server error" });
    }
};


export const editUser = async (req: Request, res: Response) => {
  try {
    const { _id, name, place, phoneNumber, isBlocked } = req.body;
    
    const user = await userModel.findById(_id);
    if (!user) {
        res.status(404).json({ ok: false, msg: "User not found" });
        return
    }
    user.name = name || user.name;
    user.place = place || user.place;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.isBlocked = isBlocked ?? user.isBlocked; 
    await user.save();
    res.json({ ok: true, msg: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};
export const adminLogout = (req: Request, res: Response) => {
    try {
       
        res.clearCookie("adminToken"); 
        res.status(200).json({ ok: true, msg: "Logged out successfully" });
        return
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Server error, try again" });
        return
    }
};
