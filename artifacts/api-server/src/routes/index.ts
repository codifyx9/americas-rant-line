import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import rantsRouter from "./rants.js";
import adminRouter from "./admin.js";
import paymentsRouter from "./payments.js";
import statsRouter from "./stats.js";
import callCodesRouter from "./callCodes.js";
import { requireAdminKey } from "../lib/adminAuth.js";

const router: IRouter = Router();

// Health check always open
router.use(healthRouter);

// ALL ROUTES ARE NOW OPEN - NO RATE LIMITER AT ALL
// (We will add it back to public site only after we confirm the phone works)

router.use(rantsRouter);
router.use("/admin", requireAdminKey, adminRouter);
router.use(paymentsRouter);
router.use(statsRouter);
router.use(callCodesRouter);

export default router;
