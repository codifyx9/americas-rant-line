import { Router } from "express";
import { db } from "@workspace/db";
import { rantsTable, callersTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

const FULL_FIELDS = {
  id: rantsTable.id,
  rantNumber: rantsTable.rantNumber,
  category: rantsTable.category,
  audioUrl: rantsTable.audioUrl,
  duration: rantsTable.duration,
  votes: rantsTable.votes,
  downvotes: rantsTable.downvotes,
  approved: rantsTable.approved,
  featured: rantsTable.featured,
  createdAt: rantsTable.createdAt,
  callerNickname: callersTable.nickname,
  callerPhone: callersTable.phone,
  callerEmail: callersTable.email,
};

router.get("/rants/pending", async (_req, res) => {
  try {
    const rows = await db
      .select(FULL_FIELDS)
      .from(rantsTable)
      .leftJoin(callersTable, eq(rantsTable.callerId, callersTable.id))
      .where(eq(rantsTable.approved, false))
      .orderBy(desc(rantsTable.createdAt));
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/rants", async (_req, res) => {
  try {
    const rows = await db
      .select(FULL_FIELDS)
      .from(rantsTable)
      .leftJoin(callersTable, eq(rantsTable.callerId, callersTable.id))
      .orderBy(desc(rantsTable.createdAt))
      .limit(100);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/rants/:id/approve", async (req, res) => {
  try {
    const [updated] = await db
      .update(rantsTable)
      .set({ approved: true })
      .where(eq(rantsTable.id, req.params.id))
      .returning();
    if (!updated) { res.status(404).json({ error: "Rant not found" }); return; }
    res.json({ success: true, rant: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/rants/:id/feature", async (req, res) => {
  try {
    const [updated] = await db
      .update(rantsTable)
      .set({ featured: true, approved: true })
      .where(eq(rantsTable.id, req.params.id))
      .returning();
    if (!updated) { res.status(404).json({ error: "Rant not found" }); return; }
    res.json({ success: true, rant: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/rants/:id/reject", async (req, res) => {
  try {
    const [deleted] = await db
      .delete(rantsTable)
      .where(eq(rantsTable.id, req.params.id))
      .returning({ id: rantsTable.id });
    if (!deleted) { res.status(404).json({ error: "Rant not found" }); return; }
    res.json({ success: true, deleted: deleted.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/callers", async (_req, res) => {
  try {
    const rows = await db.select().from(callersTable).orderBy(desc(callersTable.createdAt)).limit(100);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
