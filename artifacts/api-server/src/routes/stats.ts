import { Router } from "express";
import { db } from "@workspace/db";
import { rantsTable, callersTable } from "@workspace/db";
import { eq, desc, sql, count, sum } from "drizzle-orm";

const router = Router();

router.get("/global", async (_req, res) => {
  try {
    const [rantStats] = await db
      .select({
        totalRants: count(rantsTable.id),
        totalPlays: sum(rantsTable.plays),
        totalVotes: sum(rantsTable.votes),
        approvedRants: sql<number>`count(${rantsTable.id}) filter (where ${rantsTable.approved} = true)`,
        featuredRants: sql<number>`count(${rantsTable.id}) filter (where ${rantsTable.featured} = true)`,
      })
      .from(rantsTable);

    const [callerStats] = await db
      .select({ totalCallers: count(callersTable.id) })
      .from(callersTable);

    res.json({
      totalRants: Number(rantStats.totalRants),
      totalPlays: Number(rantStats.totalPlays ?? 0),
      totalVotes: Number(rantStats.totalVotes ?? 0),
      approvedRants: Number(rantStats.approvedRants),
      featuredRants: Number(rantStats.featuredRants),
      totalCallers: Number(callerStats.totalCallers),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/category-breakdown", async (_req, res) => {
  try {
    const rows = await db
      .select({ topic: rantsTable.category, count: count() })
      .from(rantsTable)
      .groupBy(rantsTable.category);
    
    const total = rows.reduce((sum, r) => sum + Number(r.count), 0);
    res.json(rows.map(r => ({
      topic: r.topic ?? "unknown",
      count: Number(r.count),
      percentage: total > 0 ? Math.round((Number(r.count) / total) * 100) : 0
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/calls", async (_req, res) => {
  try {
    const rows = await db
      .select({ category: rantsTable.category, total: count() })
      .from(rantsTable)
      .groupBy(rantsTable.category);
    
    const result = { total_calls: 0, maga_calls: 0, blue_calls: 0, neutral_calls: 0 };
    for (const r of rows) {
      const total = Number(r.total);
      result.total_calls += total;
      if (r.category === "maga") result.maga_calls = total;
      else if (r.category === "blue") result.blue_calls = total;
      else result.neutral_calls += total;
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/calls/today", async (_req, res) => {
  try {
    const rows = await db
      .select({ category: rantsTable.category, total: count() })
      .from(rantsTable)
      .where(sql`${rantsTable.createdAt} > now() - interval '24 hours'`)
      .groupBy(rantsTable.category);

    const result = { total_calls: 0, maga_calls: 0, blue_calls: 0, neutral_calls: 0 };
    for (const r of rows) {
      const total = Number(r.total);
      result.total_calls += total;
      if (r.category === "maga") result.maga_calls = total;
      else if (r.category === "blue") result.blue_calls = total;
      else result.neutral_calls += total;
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/topics", async (_req, res) => {
  try {
    const rows = await db
      .select({ topic: rantsTable.topic, total: count() })
      .from(rantsTable)
      .where(eq(rantsTable.approved, true))
      .groupBy(rantsTable.topic)
      .orderBy(desc(count()))
      .limit(20);
    res.json(rows.filter(r => r.topic).map(r => ({ topic: r.topic!, total: Number(r.total) })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/top-ranters", async (req, res) => {
  try {
    const limit = Math.min(100, parseInt(req.query.limit as string) || 20);
    const rows = await db
      .select({
        callerId: rantsTable.callerId,
        nickname: callersTable.nickname,
        city: callersTable.city,
        state: callersTable.state,
        totalRants: count(),
        totalVotes: sum(rantsTable.votes),
      })
      .from(rantsTable)
      .innerJoin(callersTable, eq(rantsTable.callerId, callersTable.id))
      .where(eq(rantsTable.approved, true))
      .groupBy(rantsTable.callerId, callersTable.nickname, callersTable.city, callersTable.state)
      .orderBy(desc(sql`sum(${rantsTable.votes})`))
      .limit(limit);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
