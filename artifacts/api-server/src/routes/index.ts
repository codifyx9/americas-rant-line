import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import rantsRouter from "./rants.js";
import adminRouter from "./admin.js";
import paymentsRouter from "./payments.js";
import twilioRouter from "./twilio.js";
import statsRouter from "./stats.js";
import callCodesRouter from "./callCodes.js";
import { apiLimiter } from "../lib/rateLimit.js";
import { requireAdminKey } from "../lib/adminAuth.js";

const router: IRouter = Router();

// Health check always open
router.use(healthRouter);

// TWILIO ROUTES - NO RATE LIMIT (Must always stay open for calls)
router.use("/twilio", twilioRouter);

// PUBLIC SITE & ADMIN - PROTECTED BY RATE LIMIT
router.use(apiLimiter);

router.use(rantsRouter);
router.use("/admin", requireAdminKey, adminRouter);
router.use(paymentsRouter);
router.use(statsRouter);
router.use(callCodesRouter);

export default router;
