import { Request, Response } from "express";
import userModel from "../../models/userModel";
export const editUserDetails = async (req: Request, res: Response) => {
    const {name,image,token}=req.body
   try {
    await userModel.updateOne({_id})
   } catch (error) {
    
   } 
}