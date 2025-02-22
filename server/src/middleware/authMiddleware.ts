import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.token; 
        if (!token) {
            res.json({ ok: false, msg: "Please loggin" });
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ ok: false, msg: "Unauthorized - Invalid token" });
        return
    }
};
