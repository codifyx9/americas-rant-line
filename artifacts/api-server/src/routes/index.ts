import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import rantsRouter from "./rants.js";
import adminRouter from "./admin.js";
import paymentsRouter from "./payments.js";
import statsRouter from "./stats.js";
import callCodesRouter from "./callCodes.js";
import twilioRouter from "./twilio.js";
import { requireAdminKey } from "../lib/adminAuth.js";

const router: IRouter = Router();

// Health check always open
router.use(healthRouter);

// THE PHONE LINE - FULL PATH: /api/twilio/...
// NO RATE LIMITS! NO RESTRICTIONS!
router.use("/twilio", twilioRouter);

// ALL OTHER ROUTES
router.use("/rants", rantsRouter);
router.use("/admin", requireAdminKey, adminRouter);
router.use("/payments", paymentsRouter);
router.use("/stats", statsRouter);
router.use(callCodesRouter);

export default router;
