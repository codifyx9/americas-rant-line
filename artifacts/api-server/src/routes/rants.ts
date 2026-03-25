import { Router } from "express";
import { db } from "@workspace/db";
import { rantsTable, callersTable } from "@workspace/db";
import { eq, desc, and, sql, ilike, or } from "drizzle-orm";
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

router.get("/latest", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 20));
    const offset = (page - 1) * limit;
    const category = req.query.category as string | undefined;
    const sort = (req.query.sort as string) || "newest";

    const conditions = [eq(rantsTable.approved, true)];
    if (category && ["maga", "blue", "neutral"].includes(category)) {
      conditions.push(eq(rantsTable.category, category));
    }

    let orderBy;
    switch (sort) {
      case "hottest":
      case "most-voted":
        orderBy = desc(rantsTable.votes);
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
      .where(and(...conditions));

    res.json({
      rants: rows,
      pagination: { total: Number(total), totalPages: Math.ceil(Number(total) / limit), current: page },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/trending", async (_req, res) => {
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

router.get("/featured", async (_req, res) => {
  try {
    const [row] = await db
      .select(PUBLIC_FIELDS)
      .from(rantsTable)
      .leftJoin(callersTable, eq(rantsTable.callerId, callersTable.id))
      .where(and(eq(rantsTable.approved, true), eq(rantsTable.featured, true)))
      .orderBy(desc(rantsTable.createdAt))
      .limit(1);
    res.json(row || null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    const period = (req.query.period as string) || "all";
    const conditions = [eq(rantsTable.approved, true)];
    
    if (period === "today") {
      conditions.push(sql`${rantsTable.createdAt} > now() - interval '24 hours'`);
    }

    const rows = await db
      .select(PUBLIC_FIELDS)
      .from(rantsTable)
      .leftJoin(callersTable, eq(rantsTable.callerId, callersTable.id))
      .where(and(...conditions))
      .orderBy(desc(rantsTable.votes))
      .limit(20);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [row] = await db
      .select(PUBLIC_FIELDS)
      .from(rantsTable)
      .leftJoin(callersTable, eq(rantsTable.callerId, callersTable.id))
      .where(eq(rantsTable.id, req.params.id))
      .limit(1);
    if (!row) return res.status(404).json({ error: "Rant not found" });
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/:id/vote", voteLimiter, async (req, res) => {
  try {
    const [updated] = await db
      .update(rantsTable)
      .set({ votes: sql`${rantsTable.votes} + 1` })
      .where(eq(rantsTable.id, req.params.id))
      .returning();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/:id/downvote", voteLimiter, async (req, res) => {
  try {
    const [updated] = await db
      .update(rantsTable)
      .set({ downvotes: sql`${rantsTable.downvotes} + 1` })
      .where(eq(rantsTable.id, req.params.id))
      .returning();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/:id/play", async (req, res) => {
  try {
    const [updated] = await db
      .update(rantsTable)
      .set({ plays: sql`${rantsTable.plays} + 1` })
      .where(eq(rantsTable.id, req.params.id))
      .returning();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
