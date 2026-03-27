import { Router } from "express";
import { db } from "@workspace/db";
import { callCodesTable } from "@workspace/db";
import { eq, and, sql } from "drizzle-orm";
import { generateCallCode } from "../lib/callCodeGenerator.js";

const router = Router();

router.post("/call-codes/generate", async (req, res) => {
  try {
    const { plan, category, callerId, stripeSessionId } = req.body as {
      plan: string;
      category?: string;
      callerId?: string;
      stripeSessionId?: string;
    };

    if (!plan) {
      res.status(400).json({ error: "plan is required" });
      return;
    }

    let code = generateCallCode();
    let attempts = 0;
    while (attempts < 5) {
      const existing = await db.select().from(callCodesTable).where(eq(callCodesTable.code, code)).limit(1);
      if (existing.length === 0) break;
      code = generateCallCode();
      attempts++;
    }

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const [created] = await db
      .insert(callCodesTable)
      .values({ code, plan, category, callerId, stripeSessionId, expiresAt })
      .returning();

    res.json({ code: created.code, expiresAt: created.expiresAt, plan: created.plan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/call-codes/:code", async (req, res) => {
  try {
    const [row] = await db
      .select()
      .from(callCodesTable)
      .where(eq(callCodesTable.code, req.params.code.toUpperCase()))
      .limit(1);

    if (!row) {
      res.status(404).json({ error: "Code not found" });
      return;
    }

    const expired = new Date(row.expiresAt) < new Date();
    res.json({
      code: row.code,
      plan: row.plan,
      category: row.category,
      used: row.used,
      expired,
      valid: !row.used && !expired,
      expiresAt: row.expiresAt,
      createdAt: row.createdAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/call-codes/:code/use", async (req, res) => {
  try {
    const code = req.params.code.toUpperCase();
    const { rantId } = req.body as { rantId?: string };

    const [row] = await db
      .select()
      .from(callCodesTable)
      .where(and(eq(callCodesTable.code, code), eq(callCodesTable.used, false)))
      .limit(1);

    if (!row) {
      res.status(404).json({ error: "Code not found or already used" });
      return;
    }

    if (new Date(row.expiresAt) < new Date()) {
      res.status(410).json({ error: "Code has expired" });
      return;
    }

    await db
      .update(callCodesTable)
      .set({ used: true, rantId: rantId ?? null })
      .where(eq(callCodesTable.code, code));

    res.json({ success: true, plan: row.plan, category: row.category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/call-codes/by-session/:id", async (req, res) => {
  try {
    const [row] = await db
      .select()
      .from(callCodesTable)
      .where(eq(callCodesTable.stripeSessionId, req.params.id))
      .limit(1);

    if (!row) {
      res.status(404).json({ error: "Code not found for this session" });
      return;
    }

    const expired = new Date(row.expiresAt) < new Date();
    res.json({
      code: row.code,
      plan: row.plan,
      category: row.category,
      used: row.used,
      expired,
      valid: !row.used && !expired,
      expiresAt: row.expiresAt,
      createdAt: row.createdAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
