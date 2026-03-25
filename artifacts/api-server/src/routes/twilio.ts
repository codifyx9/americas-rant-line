import { Router } from "express";
import twilio from "twilio";
import { db } from "@workspace/db";
import { callersTable, rantsTable, callCodesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { logActivity } from "../lib/activityLogger.js";

const router = Router();

router.post("/voice", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say({ voice: "alice" }, "Welcome to America's Rant Line. This call may be recorded and used publicly. Press 1 for MAGA, 2 for Blue, or 3 for Neutral.");
  twiml.gather({ numDigits: "1", action: "/api/twilio/gather", method: "POST" });
  res.type("text/xml").send(twiml.toString());
});

router.post("/gather", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  const digit = req.body.Digits || "3";
  const lineNames: Record<string, string> = { "1": "MAGA Line", "2": "Blue Line", "3": "Neutral Line" };
  const lineName = lineNames[digit] ?? "Neutral Line";
  
  twiml.say({ voice: "alice" }, `You selected the ${lineName}. Leave your rant after the beep. Press pound when done.`);
  twiml.record({ action: `/api/twilio/recording?digits=${digit}`, method: "POST", maxLength: 120, finishOnKey: "#" });
  res.type("text/xml").send(twiml.toString());
});

router.post("/recording", async (req, res) => {
  try {
    const digit = (req.query.digits as string) ?? "3";
    const categoryMap: any = { "1": "maga", "2": "blue", "3": "neutral" };
    const category = categoryMap[digit] ?? "neutral";
    const recordingUrl = (req.body.RecordingUrl as string) + ".mp3";
    const callerPhone = req.body.From as string;
    const duration = parseInt(req.body.RecordingDuration ?? "0", 10);

    let callerId: string;
    const [existing] = await db.select().from(callersTable).where(eq(callersTable.phone, callerPhone)).limit(1);

    if (existing) {
      callerId = existing.id;
    } else {
      const [newCaller] = await db.insert(callersTable).values({ phone: callerPhone }).returning({ id: callersTable.id });
      callerId = newCaller.id;
    }

    const [rant] = await db.insert(rantsTable).values({
      callerId,
      category,
      audioUrl: recordingUrl,
      duration,
      approved: false, // Moderation default
    }).returning();

    await logActivity("rant_received", `New rant #${rant.rantNumber} received from ${callerPhone.slice(0, 6)}***`, {
      rantId: rant.id,
      category,
      duration
    });

    res.sendStatus(204);
  } catch (err) {
    console.error("Twilio recording webhook error:", err);
    res.sendStatus(500);
  }
});

export default router;
