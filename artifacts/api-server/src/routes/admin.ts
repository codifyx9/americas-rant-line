import { Router } from "express";
import { db } from "@workspace/db";
import { rantsTable, callersTable, activityLogTable, callCodesTable } from "@workspace/db";
import { eq, desc, sql, count, sum, and } from "drizzle-orm";
import { logActivity } from "../lib/activityLogger.js";

const router = Router();

const FULL_FIELDS = {
  id: rantsTable.id,
  rantNumber: rantsTable.rantNumber,
  category: rantsTable.category,
  title: rantsTable.title,
  topic: rantsTable.topic,
  audioUrl: rantsTable.audioUrl,
  duration: rantsTable.duration,
  votes: rantsTable.votes,
  downvotes: rantsTable.downvotes,
  plays: rantsTable.plays,
  approved: rantsTable.approved,
  featured: rantsTable.featured,
  createdAt: rantsTable.createdAt,
  callerNickname: callersTable.nickname,
  callerPhone: callersTable.phone,
  callerEmail: callersTable.email,
  callerCity: callersTable.city,
  callerState: callersTable.state,
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
    if (!updated) return res.status(404).json({ error: "Rant not found" });
    await logActivity("rant_approved", `Rant #${updated.rantNumber} approved`, { rantId: updated.id });
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
    if (!updated) return res.status(404).json({ error: "Rant not found" });
    await logActivity("rant_featured", `Rant #${updated.rantNumber} featured`, { rantId: updated.id, category: updated.category });
    res.json({ success: true, rant: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/rants/:id/unfeature", async (req, res) => {
  try {
    const [updated] = await db
      .update(rantsTable)
      .set({ featured: false })
      .where(eq(rantsTable.id, req.params.id))
      .returning();
    if (!updated) return res.status(404).json({ error: "Rant not found" });
    await logActivity("rant_unfeatured", `Rant #${updated.rantNumber} removed from featured`, { rantId: updated.id });
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
      .returning();
    if (!deleted) return res.status(404).json({ error: "Rant not found" });
    await logActivity("rant_rejected", `Rant #${deleted.rantNumber} deleted`, { rantId: deleted.id });
    res.json({ success: true, deleted: deleted.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/rants/bulk-approve", async (_req, res) => {
  try {
    const updated = await db
      .update(rantsTable)
      .set({ approved: true })
      .where(eq(rantsTable.approved, false))
      .returning();
    await logActivity("bulk_approve", `Bulk approved ${updated.length} rants`, { count: updated.length });
    res.json({ success: true, approved: updated.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/rants/:id/category", async (req, res) => {
  try {
    const { category, topic } = req.body;
    const updates: Record<string, any> = {};
    if (category) updates.category = category;
    if (topic !== undefined) updates.topic = topic;
    const [updated] = await db
      .update(rantsTable)
      .set(updates)
      .where(eq(rantsTable.id, req.params.id))
      .returning();
    if (!updated) return res.status(404).json({ error: "Rant not found" });
    res.json({ success: true, rant: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/rants/:id/title", async (req, res) => {
  try {
    const { title } = req.body;
    const [updated] = await db
      .update(rantsTable)
      .set({ title })
      .where(eq(rantsTable.id, req.params.id))
      .returning();
    if (!updated) return res.status(404).json({ error: "Rant not found" });
    res.json({ success: true, rant: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/stats/revenue", async (req, res) => {
  try {
    const period = (req.query.period as string) || "week";
    let interval = "7 days";
    if (period === "month") interval = "30 days";
    else if (period === "year") interval = "365 days";

    const PRICES: Record<string, number> = { "leave-rant": 2.99, "skip-line": 12.99, "featured": 39.99 };

    const rows = await db
      .select({ plan: callCodesTable.plan, total: count() })
      .from(callCodesTable)
      .where(sql`${callCodesTable.createdAt} > now() - interval '1 ${sql.raw(interval)}'`)
      .groupBy(callCodesTable.plan);

    let totalRevenue = 0;
    const breakdown: { plan: string; count: number; revenue: number }[] = [];
    for (const r of rows) {
      const price = PRICES[r.plan] ?? 0;
      const rev = Number(r.total) * price;
      totalRevenue += rev;
      breakdown.push({ plan: r.plan, count: Number(r.total), revenue: rev });
    }

    res.json({ totalRevenue, breakdown, period });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/callers", async (_req, res) => {
  try {
    const rows = await db.select().from(callersTable).orderBy(desc(callersTable.createdAt)).limit(200);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/activity", async (_req, res) => {
  try {
    const rows = await db.select().from(activityLogTable).orderBy(desc(activityLogTable.createdAt)).limit(50);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
