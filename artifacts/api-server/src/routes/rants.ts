import { Router } from "express";
import { db } from "@workspace/db";
import { rantsTable, callersTable } from "@workspace/db";
import { eq, desc, and, sql } from "drizzle-orm";
import { voteLimiter } from "../lib/rateLimit.js";

const router = Router();

const PUBLIC_FIELDS = {
  id: rantsTable.id,
  rantNumber: rantsTable.rantNumber,
  category: rantsTable.category,
  audioUrl: rantsTable.audioUrl,
  duration: rantsTable.duration,
  votes: rantsTable.votes,
  downvotes: rantsTable.downvotes,
  featured: rantsTable.featured,
  createdAt: rantsTable.createdAt,
  callerNickname: callersTable.nickname,
};

router.get("/rants/latest", async (_req, res) => {
  try {
    const rows = await db
      .select(PUBLIC_FIELDS)
      .from(rantsTable)
      .leftJoin(callersTable, eq(rantsTable.callerId, callersTable.id))
      .where(eq(rantsTable.approved, true))
      .orderBy(desc(rantsTable.createdAt))
      .limit(20);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/rants/trending", async (_req, res) => {
  try {
    const rows = await db
      .select(PUBLIC_FIELDS)
      .from(rantsTable)
      .leftJoin(callersTable, eq(rantsTable.callerId, callersTable.id))
      .where(and(eq(rantsTable.approved, true), sql`${rantsTable.createdAt} > now() - interval '48 hours'`))
      .orderBy(desc(rantsTable.votes))
      .limit(20);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/rants/leaderboard", async (_req, res) => {
  try {
    const rows = await db
      .select(PUBLIC_FIELDS)
      .from(rantsTable)
      .leftJoin(callersTable, eq(rantsTable.callerId, callersTable.id))
      .where(eq(rantsTable.approved, true))
      .orderBy(desc(rantsTable.votes))
      .limit(20);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/rants/:id", async (req, res) => {
  try {
    const [row] = await db
      .select(PUBLIC_FIELDS)
      .from(rantsTable)
      .leftJoin(callersTable, eq(rantsTable.callerId, callersTable.id))
      .where(and(eq(rantsTable.id, req.params.id), eq(rantsTable.approved, true)))
      .limit(1);
    if (!row) { res.status(404).json({ error: "Rant not found" }); return; }
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/rants/:id/vote", voteLimiter, async (req, res) => {
  try {
    const [updated] = await db
      .update(rantsTable)
      .set({ votes: sql`${rantsTable.votes} + 1` })
      .where(and(eq(rantsTable.id, req.params.id), eq(rantsTable.approved, true)))
      .returning({ votes: rantsTable.votes, id: rantsTable.id });
    if (!updated) { res.status(404).json({ error: "Rant not found" }); return; }
    res.json({ id: updated.id, votes: updated.votes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/rants/:id/downvote", voteLimiter, async (req, res) => {
  try {
    const [updated] = await db
      .update(rantsTable)
      .set({ downvotes: sql`${rantsTable.downvotes} + 1` })
      .where(and(eq(rantsTable.id, req.params.id), eq(rantsTable.approved, true)))
      .returning({ downvotes: rantsTable.downvotes, id: rantsTable.id });
    if (!updated) { res.status(404).json({ error: "Rant not found" }); return; }
    res.json({ id: updated.id, downvotes: updated.downvotes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
