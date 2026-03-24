import { Router } from "express";
import { db } from "@workspace/db";
import { rantsTable, callersTable } from "@workspace/db";
import { eq, desc, and, sql, asc, ilike, or } from "drizzle-orm";
import { voteLimiter } from "../lib/rateLimit.js";

const router = Router();

const PUBLIC_FIELDS = {
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
  featured: rantsTable.featured,
  createdAt: rantsTable.createdAt,
  callerNickname: callersTable.nickname,
  callerCity: callersTable.city,
  callerState: callersTable.state,
};

router.get("/rants/latest", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 20));
    const offset = (page - 1) * limit;
    const category = req.query.category as string | undefined;
    const topic = req.query.topic as string | undefined;
    const q = req.query.q as string | undefined;
    const sort = (req.query.sort as string) || "newest";

    const conditions = [eq(rantsTable.approved, true)];
    if (category && ["maga", "blue", "neutral"].includes(category)) {
      conditions.push(eq(rantsTable.category, category));
    }
    if (topic) {
      conditions.push(eq(rantsTable.topic, topic));
    }
    if (q) {
      conditions.push(
        or(
          ilike(rantsTable.title, `%${q}%`),
          ilike(rantsTable.topic, `%${q}%`),
          ilike(callersTable.nickname, `%${q}%`)
        )!
      );
    }

    let orderBy;
    switch (sort) {
      case "hottest":
        orderBy = desc(rantsTable.votes);
        break;
      case "most-voted":
        orderBy = desc(rantsTable.votes);
        break;
      case "longest":
        orderBy = desc(rantsTable.duration);
        break;
      case "newest":
      default:
        orderBy = desc(rantsTable.createdAt);
        break;
    }

    const rows = await db
      .select(PUBLIC_FIELDS)
      .from(rantsTable)
      .leftJoin(callersTable, eq(rantsTable.callerId, callersTable.id))
      .where(and(...conditions))
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    const [{ total }] = await db
      .select({ total: sql<number>`count(*)` })
      .from(rantsTable)
      .leftJoin(callersTable, eq(rantsTable.callerId, callersTable.id))
      .where(and(...conditions));

    res.json({
      rants: rows,
      pagination: { page, limit, total: Number(total), totalPages: Math.ceil(Number(total) / limit) },
    });
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

router.get("/rants/featured", async (_req, res) => {
  try {
    const [row] = await db
      .select(PUBLIC_FIELDS)
      .from(rantsTable)
      .leftJoin(callersTable, eq(rantsTable.callerId, callersTable.id))
      .where(and(eq(rantsTable.approved, true), eq(rantsTable.featured, true)))
      .orderBy(desc(rantsTable.createdAt))
      .limit(1);
    res.json(row ?? null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/rants/by-line", async (_req, res) => {
  try {
    const results: Record<string, any[]> = { maga: [], blue: [], neutral: [] };
    for (const cat of ["maga", "blue", "neutral"] as const) {
      results[cat] = await db
        .select(PUBLIC_FIELDS)
        .from(rantsTable)
        .leftJoin(callersTable, eq(rantsTable.callerId, callersTable.id))
        .where(and(eq(rantsTable.approved, true), eq(rantsTable.category, cat)))
        .orderBy(desc(rantsTable.createdAt))
        .limit(10);
    }
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/rants/top-by-line", async (_req, res) => {
  try {
    const results: Record<string, any> = {};
    for (const cat of ["maga", "blue", "neutral"] as const) {
      const [row] = await db
        .select(PUBLIC_FIELDS)
        .from(rantsTable)
        .leftJoin(callersTable, eq(rantsTable.callerId, callersTable.id))
        .where(and(eq(rantsTable.approved, true), eq(rantsTable.category, cat)))
        .orderBy(desc(rantsTable.votes))
        .limit(1);
      results[cat] = row ?? null;
    }
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/rants/leaderboard", async (req, res) => {
  try {
    const period = (req.query.period as string) || "all";
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 20));

    const conditions = [eq(rantsTable.approved, true)];
    switch (period) {
      case "today":
        conditions.push(sql`${rantsTable.createdAt} > now() - interval '24 hours'`);
        break;
      case "week":
        conditions.push(sql`${rantsTable.createdAt} > now() - interval '7 days'`);
        break;
      case "month":
        conditions.push(sql`${rantsTable.createdAt} > now() - interval '30 days'`);
        break;
    }

    const rows = await db
      .select(PUBLIC_FIELDS)
      .from(rantsTable)
      .leftJoin(callersTable, eq(rantsTable.callerId, callersTable.id))
      .where(and(...conditions))
      .orderBy(desc(rantsTable.votes))
      .limit(limit);
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

router.post("/rants/:id/play", async (req, res) => {
  try {
    const [updated] = await db
      .update(rantsTable)
      .set({ plays: sql`${rantsTable.plays} + 1` })
      .where(and(eq(rantsTable.id, req.params.id), eq(rantsTable.approved, true)))
      .returning({ plays: rantsTable.plays, id: rantsTable.id });
    if (!updated) { res.status(404).json({ error: "Rant not found" }); return; }
    res.json({ id: updated.id, plays: updated.plays });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
