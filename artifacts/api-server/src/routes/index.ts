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

// Applying Rate Limiting first to PROTECT the server
router.use(apiLimiter);

router.use(healthRouter);
router.use(rantsRouter);

// ALL admin actions now REQUIRE a valid secret key
router.use("/admin", requireAdminKey, adminRouter); 

router.use(paymentsRouter);
router.use(twilioRouter);
router.use(statsRouter);
router.use(callCodesRouter);

export default router;
