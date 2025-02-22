import { Request,Response } from "express";
import jwt from "jsonwebtoken"
export const LoginAdmin = (req: Request, res: Response): void => {
    console.log("its working")
    const { name, password } = req.body;
    try {
        if (password !== process.env.ADMIN_PASSWORD && name !== process.env.ADMIN_USERNAME) {
            res.json({ ok: false, msg: "Invalid credentioals" })   
            return
        }
        const token = jwt.sign({role:"admin"},process.env.JWT_SECRET as string,{expiresIn:"1h"})
        res.json({ ok: true, msg: "login succes", token })
        return
    } catch (error) {
        console.error(error)
        res.json({ok:false,msg:"Server error"})
    }
}