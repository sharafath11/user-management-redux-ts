import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.adminToken; 
     console.log(req.cookies)
    if (!token) {
        res.status(403).json({ ok: false, msg: "Unauthorized" });
        return
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.body.admin = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ ok: false, msg: "Invalid token" });
        return
    }
};
