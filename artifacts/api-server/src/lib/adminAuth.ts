import { type Request, type Response, type NextFunction } from "express";

export const requireAdminKey = (req: Request, res: Response, next: NextFunction) => {
  const adminKey = process.env["ADMIN_API_KEY"];
  const providedKey = req.headers["x-admin-key"] || req.query["key"];

  if (!adminKey || providedKey !== adminKey) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
};
