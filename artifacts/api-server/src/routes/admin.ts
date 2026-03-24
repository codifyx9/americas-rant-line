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
    if (!updated) { res.status(404).json({ error: "Rant not found" }); return; }
    await logActivity("rant_approved", `Rant #${updated.rantNumber} approved`, { rantId: updated.id, category: updated.category });
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
    await logActivity("rant_featured", `Rant #${updated.rantNumber} featured`, { rantId: updated.id, category: updated.category });
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
      .returning({ id: rantsTable.id, rantNumber: rantsTable.rantNumber });
    if (!deleted) { res.status(404).json({ error: "Rant not found" }); return; }
    await logActivity("rant_rejected", `Rant #${deleted.rantNumber} rejected`, { rantId: deleted.id });
    res.json({ success: true, deleted: deleted.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/rants/:id/category", async (req, res) => {
  try {
    const { topic, category } = req.body as { topic?: string; category?: string };
    const updates: Record<string, any> = {};
    if (topic !== undefined) updates.topic = topic;
    if (category && ["maga", "blue", "neutral"].includes(category)) updates.category = category;

    if (Object.keys(updates).length === 0) {
      res.status(400).json({ error: "Provide topic and/or category" });
      return;
    }

    const [updated] = await db
      .update(rantsTable)
      .set(updates)
      .where(eq(rantsTable.id, req.params.id))
      .returning();
    if (!updated) { res.status(404).json({ error: "Rant not found" }); return; }
    await logActivity("rant_categorized", `Rant #${updated.rantNumber} categorized`, { rantId: updated.id, ...updates });
    res.json({ success: true, rant: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/rants/:id/title", async (req, res) => {
  try {
    const { title } = req.body as { title: string };
    if (!title) { res.status(400).json({ error: "title is required" }); return; }

    const [updated] = await db
      .update(rantsTable)
      .set({ title })
      .where(eq(rantsTable.id, req.params.id))
      .returning();
    if (!updated) { res.status(404).json({ error: "Rant not found" }); return; }
    res.json({ success: true, rant: updated });
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
      .returning({ id: rantsTable.id, rantNumber: rantsTable.rantNumber });
    await logActivity("bulk_approve", `${updated.length} rants bulk-approved`, { count: updated.length });
    res.json({ success: true, approved: updated.length, rants: updated });
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

router.get("/stats/revenue", async (req, res) => {
  try {
    const period = (req.query.period as string) || "week";
    let interval = "7 days";
    if (period === "month") interval = "30 days";
    if (period === "year") interval = "365 days";

    const rows = await db
      .select({
        day: sql<string>`date_trunc('day', ${callCodesTable.createdAt})::date`,
        total: count(),
        plans: sql<string>`json_agg(${callCodesTable.plan})`,
      })
      .from(callCodesTable)
      .where(sql`${callCodesTable.createdAt} > now() - interval '${sql.raw(interval)}'`)
      .groupBy(sql`date_trunc('day', ${callCodesTable.createdAt})::date`)
      .orderBy(sql`date_trunc('day', ${callCodesTable.createdAt})::date`);

    const PRICES: Record<string, number> = { "leave-rant": 2.99, "skip-line": 5.0, "featured": 25.0 };

    const dailyRevenue = rows.map(r => {
      const plans = JSON.parse(r.plans as string) as string[];
      const revenue = plans.reduce((sum, p) => sum + (PRICES[p] ?? 0), 0);
      return { date: r.day, transactions: Number(r.total), revenue: Math.round(revenue * 100) / 100 };
    });

    const totalRevenue = dailyRevenue.reduce((sum, d) => sum + d.revenue, 0);
    const totalTransactions = dailyRevenue.reduce((sum, d) => sum + d.transactions, 0);

    res.json({ period, dailyRevenue, totalRevenue: Math.round(totalRevenue * 100) / 100, totalTransactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/activity", async (req, res) => {
  try {
    const limit = Math.min(50, parseInt(req.query.limit as string) || 20);
    const rows = await db
      .select()
      .from(activityLogTable)
      .orderBy(desc(activityLogTable.createdAt))
      .limit(limit);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
