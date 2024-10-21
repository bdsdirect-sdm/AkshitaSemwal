import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret: string = "123"; 
export const JWT = async (req: any, res: any, next: any) => {
  const token = req.header("Authorization")?.split(" ")[1]; 

  if (!token) {
    return res.sendStatus(403); 
  }

 const payload = await jwt.verify(token, secret);
 console.log(payload)
 req.user  = payload
 next();
};
