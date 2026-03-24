import { Router } from "express";
import twilio from "twilio";
import { db } from "@workspace/db";
import { callersTable, rantsTable, callCodesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { logActivity } from "../lib/activityLogger.js";

const router = Router();

router.post("/twilio/voice", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  twiml.say(
    { voice: "alice" },
    "Welcome to America's Rant Line. " +
    "This call may be recorded and used publicly on our website and social media. " +
    "Press 1 for the MAGA Line. " +
    "Press 2 for the Blue Line. " +
    "Press 3 for the Neutral Line."
  );

  const gather = twiml.gather({ numDigits: "1", action: "/api/twilio/gather", method: "POST" });
  gather.say({ voice: "alice" }, "Press 1 for MAGA, 2 for Blue, 3 for Neutral.");

  twiml.say({ voice: "alice" }, "We did not receive your selection. Goodbye.");
  twiml.hangup();

  res.type("text/xml").send(twiml.toString());
});

router.post("/twilio/gather", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  const digit = req.body.Digits as string;

  const lineNames: Record<string, string> = { "1": "MAGA Line", "2": "Blue Line", "3": "Neutral Line" };
  const lineName = lineNames[digit] ?? "Neutral Line";

  twiml.say({ voice: "alice" }, `You selected the ${lineName}. If you have a call code, enter it now followed by pound. Otherwise, just press pound to continue.`);

  twiml.gather({
    numDigits: "8",
    action: `/api/twilio/code-check?digits=${digit}`,
    method: "POST",
    finishOnKey: "#",
    timeout: 5,
  });

  twiml.redirect({ method: "POST" }, `/api/twilio/record?digits=${digit}&plan=leave-rant`);

  res.type("text/xml").send(twiml.toString());
});

router.post("/twilio/code-check", async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  const digit = req.query.digits as string;
  const enteredCode = req.body.Digits as string;

  if (enteredCode && enteredCode.length > 0) {
    const code = `RNT-${enteredCode.slice(0, 4).toUpperCase()}`;
    const [row] = await db
      .select()
      .from(callCodesTable)
      .where(and(eq(callCodesTable.code, code), eq(callCodesTable.used, false)))
      .limit(1);

    if (row && new Date(row.expiresAt) > new Date()) {
      const planName = row.plan === "featured" ? "Featured Rant" : row.plan === "skip-line" ? "Skip the Line" : "Standard Rant";
      twiml.say({ voice: "alice" }, `Code accepted! Your plan: ${planName}.`);
      twiml.redirect({ method: "POST" }, `/api/twilio/record?digits=${digit}&plan=${row.plan}&code=${code}`);
      res.type("text/xml").send(twiml.toString());
      return;
    }

    twiml.say({ voice: "alice" }, "Invalid or expired code. Continuing with standard recording.");
  }

  twiml.redirect({ method: "POST" }, `/api/twilio/record?digits=${digit}&plan=leave-rant`);
  res.type("text/xml").send(twiml.toString());
});

router.post("/twilio/record", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  const digit = req.query.digits as string;
  const plan = req.query.plan as string || "leave-rant";
  const code = req.query.code as string || "";

  const lineNames: Record<string, string> = { "1": "MAGA Line", "2": "Blue Line", "3": "Neutral Line" };
  const lineName = lineNames[digit] ?? "Neutral Line";

  const maxLength = plan === "featured" ? 300 : plan === "skip-line" ? 300 : 180;

  twiml.say({ voice: "alice" }, `Recording for the ${lineName}. After the beep, leave your rant. Press pound when done.`);
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

router.post("/twilio/recording", async (req, res) => {
  try {
    const digit = (req.query.digits as string) ?? req.body.Digits ?? "3";
    const plan = (req.query.plan as string) || "leave-rant";
    const code = (req.query.code as string) || "";
    const categoryMap: Record<string, "maga" | "blue" | "neutral"> = {
      "1": "maga",
      "2": "blue",
      "3": "neutral",
    };
    const category = categoryMap[digit] ?? "neutral";

    const recordingUrl = (req.body.RecordingUrl as string) + ".mp3";
    const callerPhone = req.body.From as string;
    const duration = parseInt(req.body.RecordingDuration ?? "0", 10);

    let callerId: string | undefined;

    const existing = await db
      .select()
      .from(callersTable)
      .where(eq(callersTable.phone, callerPhone))
      .limit(1);

    if (existing.length > 0) {
      callerId = existing[0].id;
    } else {
      const [newCaller] = await db
        .insert(callersTable)
        .values({ phone: callerPhone })
        .returning({ id: callersTable.id });
      callerId = newCaller.id;
    }

    const isFeatured = plan === "featured";
    const [rant] = await db.insert(rantsTable).values({
      callerId,
      category,
      audioUrl: recordingUrl,
      duration,
    }).returning();

    if (code) {
      await db
        .update(callCodesTable)
        .set({ used: true, rantId: rant.id })
        .where(eq(callCodesTable.code, code));
    }

    await logActivity("rant_received", `New rant #${rant.rantNumber} received from ${callerPhone.slice(0, 6)}***`, {
      rantId: rant.id,
      category,
      plan,
      duration,
      callerPhone: callerPhone.slice(0, 6) + "***",
    });

    res.sendStatus(204);
  } catch (err) {
    console.error("Twilio recording webhook error:", err);
    res.sendStatus(500);
  }
});

export default router;
