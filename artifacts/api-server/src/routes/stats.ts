import { Router } from "express";
import { db } from "@workspace/db";
import { rantsTable, callersTable } from "@workspace/db";
import { eq, sql, count, sum, desc, and } from "drizzle-orm";

const router = Router();

function callCountResult(rows: { category: string | null; total: number }[]) {
  const result = { maga_calls: 0, blue_calls: 0, neutral_calls: 0, total_calls: 0 };
  for (const row of rows) {
    const n = Number(row.total);
    if (row.category === "maga") result.maga_calls = n;
    if (row.category === "blue") result.blue_calls = n;
    if (row.category === "neutral") result.neutral_calls = n;
    result.total_calls += n;
  }
  return result;
}

router.get("/stats/calls", async (_req, res) => {
  try {
    const rows = await db
      .select({ category: rantsTable.category, total: count() })
      .from(rantsTable)
      .groupBy(rantsTable.category);
    res.json(callCountResult(rows));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/stats/calls/today", async (_req, res) => {
  try {
    const rows = await db
      .select({ category: rantsTable.category, total: count() })
      .from(rantsTable)
      .where(sql`${rantsTable.createdAt} > now() - interval '24 hours'`)
      .groupBy(rantsTable.category);
    res.json(callCountResult(rows));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/stats/global", async (_req, res) => {
  try {
    const [rantStats] = await db
      .select({
        totalRants: count(),
        totalPlays: sum(rantsTable.plays),
        totalVotes: sum(rantsTable.votes),
        approvedRants: sql<number>`count(*) filter (where ${rantsTable.approved} = true)`,
        featuredRants: sql<number>`count(*) filter (where ${rantsTable.featured} = true)`,
      })
      .from(rantsTable);

    const [callerStats] = await db
      .select({ totalCallers: count() })
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

router.get("/stats/topics", async (_req, res) => {
  try {
    const rows = await db
      .select({ topic: rantsTable.topic, total: count() })
      .from(rantsTable)
      .where(and(eq(rantsTable.approved, true), sql`${rantsTable.topic} is not null`))
      .groupBy(rantsTable.topic)
      .orderBy(desc(count()))
      .limit(20);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/stats/top-ranters", async (req, res) => {
  try {
    const limit = Math.min(20, parseInt(req.query.limit as string) || 10);
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
      .orderBy(desc(sum(rantsTable.votes)))
      .limit(limit);

    res.json(rows.map((r, i) => ({
      rank: i + 1,
      callerId: r.callerId,
      nickname: r.nickname ?? "Anonymous",
      city: r.city,
      state: r.state,
      totalRants: Number(r.totalRants),
      totalVotes: Number(r.totalVotes ?? 0),
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/stats/category-breakdown", async (_req, res) => {
  try {
    const rows = await db
      .select({ topic: rantsTable.topic, total: count() })
      .from(rantsTable)
      .where(and(eq(rantsTable.approved, true), sql`${rantsTable.topic} is not null`))
      .groupBy(rantsTable.topic)
      .orderBy(desc(count()));

    const totalAll = rows.reduce((acc, r) => acc + Number(r.total), 0);
    res.json(rows.map(r => ({
      topic: r.topic,
      count: Number(r.total),
      percentage: totalAll > 0 ? Math.round((Number(r.total) / totalAll) * 100) : 0,
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
