import { Router, type IRouter } from "express";
import healthRouter from "./health";
import rantsRouter from "./rants";
import adminRouter from "./admin";
import paymentsRouter from "./payments";
import twilioRouter from "./twilio";
import statsRouter from "./stats";
import callCodesRouter from "./callCodes";
import { apiLimiter } from "../lib/rateLimit.js";
import { requireAdminKey } from "../lib/adminAuth.js";

const router: IRouter = Router();

router.use(apiLimiter);
router.use(healthRouter);
router.use(rantsRouter);
router.use("/admin", requireAdminKey, adminRouter);
router.use(paymentsRouter);
router.use(twilioRouter);
router.use(statsRouter);
router.use(callCodesRouter);

export default router;
