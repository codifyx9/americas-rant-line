import { Router } from "express";
import { db } from "@workspace/db";
import { rantsTable } from "@workspace/db";
import { eq, and, sql, count } from "drizzle-orm";

const router = Router();

router.get("/stats/calls", async (_req, res) => {
  try {
    const rows = await db
      .select({ category: rantsTable.category, total: count() })
      .from(rantsTable)
      .groupBy(rantsTable.category);

    const result = { maga_calls: 0, blue_calls: 0, neutral_calls: 0, total_calls: 0 };
    for (const row of rows) {
      const n = Number(row.total);
      if (row.category === "maga")    result.maga_calls    = n;
      if (row.category === "blue")    result.blue_calls    = n;
      if (row.category === "neutral") result.neutral_calls = n;
      result.total_calls += n;
    }
    res.json(result);
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

    const result = { maga_calls: 0, blue_calls: 0, neutral_calls: 0, total_calls: 0 };
    for (const row of rows) {
      const n = Number(row.total);
      if (row.category === "maga")    result.maga_calls    = n;
      if (row.category === "blue")    result.blue_calls    = n;
      if (row.category === "neutral") result.neutral_calls = n;
      result.total_calls += n;
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
