import { Router } from "express";
import twilio from "twilio";
import { db } from "@workspace/db";
import { callersTable, rantsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

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

  twiml.say({ voice: "alice" }, `You selected the ${lineName}. After the beep, leave your rant. Press pound when done.`);
  twiml.record({
    action: `/api/twilio/recording?digits=${digit}`,
    method: "POST",
    maxLength: 300,
    finishOnKey: "#",
    transcribe: false,
    playBeep: true,
  });
  twiml.say({ voice: "alice" }, "Thank you for your rant. Visit America's Rant Line dot com to see it posted.");

  res.type("text/xml").send(twiml.toString());
});

router.post("/twilio/recording", async (req, res) => {
  try {
    const digit = (req.query.digits as string) ?? req.body.Digits ?? "3";
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

    await db.insert(rantsTable).values({
      callerId,
      category,
      audioUrl: recordingUrl,
      duration,
    });

    res.sendStatus(204);
  } catch (err) {
    console.error("Twilio recording webhook error:", err);
    res.sendStatus(500);
  }
});

export default router;
