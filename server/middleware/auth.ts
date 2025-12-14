import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    name: string;
    email: string;
  };
}

export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("AUTH HEADER:", req.headers.authorization);

  if (!req.headers.authorization?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No auth header" });
  }

  const token = req.headers.authorization.split(" ")[1];
  console.log("TOKEN RECEIVED:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    console.log("DECODED TOKEN:", decoded);

    req.user = {
      name: decoded.name,
      email: decoded.email,
    };

    next();
  } catch (err) {
    console.error("JWT ERROR:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
