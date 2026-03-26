import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import router from "./routes/index.js";
import twilioRouter from "./routes/twilio.js";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// BYPASSING Index for Twilio to ensure the path is EXACTLY /api/twilio/voice
// This stops any nesting confusion or mistakes.
app.use("/api/twilio", twilioRouter);

// Everything else goes through the standard index
app.use("/api", router);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
