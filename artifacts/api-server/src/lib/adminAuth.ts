import type { Request, Response, NextFunction } from "express";

export function requireAdminKey(req: Request, res: Response, next: NextFunction) {
  const key = req.headers["x-admin-key"] ?? req.headers["authorization"]?.replace("Bearer ", "");
  if (!process.env.ADMIN_API_KEY || key !== process.env.ADMIN_API_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
