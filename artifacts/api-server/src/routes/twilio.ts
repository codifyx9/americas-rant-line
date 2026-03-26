import { Router } from "express";
import twilio from "twilio";
import { db } from "@workspace/db";
import { callersTable, rantsTable, callCodesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { logActivity } from "../lib/activityLogger.js";

const router = Router();

// Full path: /api/twilio/voice
router.post("/voice", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say({ voice: "alice" }, "Welcome to America's Rant Line. This call may be recorded and used publicly on our website and social media. Press 1 for the MAGA Line. Press 2 for the Blue Line. Press 3 for the Neutral Line.");
  const gather = twiml.gather({ numDigits: "1", action: "/api/twilio/gather", method: "POST" });
  gather.say({ voice: "alice" }, "Press 1 for MAGA, 2 for Blue, 3 for Neutral.");
  twiml.say({ voice: "alice" }, "We did not receive your selection. Goodbye.");
  twiml.hangup();
  res.type("text/xml").send(twiml.toString());
});

// Full path: /api/twilio/gather
router.post("/gather", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  const digit = req.body.Digits || "3";
  const lineNames: Record<string, string> = { "1": "MAGA Line", "2": "Blue Line", "3": "Neutral Line" };
  const lineName = lineNames[digit] ?? "Neutral Line";
  
  twiml.say({ voice: "alice" }, `You selected the ${lineName}. If you have a call code, enter it now followed by pound. Otherwise, just press pound to continue.`);
  twiml.gather({
    numDigits: "8",
    action: `/api/twilio/code-check?digits=${digit}`,
    method: "POST",
    finishOnKey: "#",
    timeout: 5
  });
  twiml.redirect({ method: "POST" }, `/api/twilio/record?digits=${digit}&plan=leave-rant`);
  res.type("text/xml").send(twiml.toString());
});

// Full path: /api/twilio/code-check
router.post("/code-check", async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  const digit = req.query.digits || "3";
  const enteredCode = req.body.Digits;

  if (enteredCode && enteredCode.length > 0) {
    const code = `RNT-${enteredCode.slice(0, 4).toUpperCase()}`;
    const [row] = await db.select().from(callCodesTable).where(
      and(eq(callCodesTable.code, code), eq(callCodesTable.used, false))
    ).limit(1);

    if (row && new Date(row.expiresAt) > new Date()) {
      twiml.say({ voice: "alice" }, "Code accepted!");
      twiml.redirect({ method: "POST" }, `/api/twilio/record?digits=${digit}&plan=${row.plan}&code=${code}`);
      return res.type("text/xml").send(twiml.toString());
    }
    twiml.say({ voice: "alice" }, "Invalid or expired code.");
  }
  twiml.redirect({ method: "POST" }, `/api/twilio/record?digits=${digit}&plan=leave-rant`);
  res.type("text/xml").send(twiml.toString());
});

// Full path: /api/twilio/record
router.post("/record", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  const digit = req.query.digits as string;
  const plan = req.query.plan as string || "leave-rant";
  const code = req.query.code as string || "";

  const lineNames: Record<string, string> = { "1": "MAGA", "2": "Blue", "3": "Neutral" };
  const lineName = lineNames[digit] ?? "Neutral";
  const maxLength = plan === "featured" ? 300 : (plan === "skip-line" ? 300 : 180);

  twiml.say({ voice: "alice" }, `Recording for the ${lineName} Line. After the beep, leave your rant. Press pound when done.`);
  twiml.record({
    action: `/api/twilio/recording?digits=${digit}&plan=${plan}&code=${code}`,
    method: "POST",
    maxLength,
    finishOnKey: "#",
    transcribe: false,
    playBeep: true,
  });
  twiml.say({ voice: "alice" }, "Thank you for your rant. Visit Americas Rant Line dot com to see it posted.");
  res.type("text/xml").send(twiml.toString());
});

// Full path: /api/twilio/recording
router.post("/recording", async (req, res) => {
  try {
    const digit = (req.query.digits as string) ?? "3";
    const plan = (req.query.plan as string) || "leave-rant";
    const code = (req.query.code as string) || "";
    
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

    if (code) {
      await db.update(callCodesTable).set({ used: true }).where(eq(callCodesTable.code, code));
    }

    const [rant] = await db.insert(rantsTable).values({
      callerId,
      category,
      audioUrl: recordingUrl,
      duration,
      approved: false,
    }).returning();

    await logActivity("rant_received", `New rant #${rant.rantNumber} received from ${callerPhone.slice(0, 6)}***`, {
      rantId: rant.id,
      category,
      plan,
      duration
    });

    res.sendStatus(204);
  } catch (err) {
    console.error("Twilio recording webhook error:", err);
    res.sendStatus(500);
  }
});

export default router;
