import { pgTable, text, uuid, timestamp, integer, boolean, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { callersTable } from "./callers";

export const RANT_CATEGORIES = ["maga", "blue", "neutral"] as const;
export type RantCategory = typeof RANT_CATEGORIES[number];

export const rantsTable = pgTable("rants", {
  id: uuid("id").primaryKey().defaultRandom(),
  rantNumber: serial("rant_number").notNull(),
  callerId: uuid("caller_id").references(() => callersTable.id),
  category: text("category").$type<RantCategory>().notNull(),
  title: text("title"),
  topic: text("topic"),
  audioUrl: text("audio_url").notNull(),
  duration: integer("duration").default(0),
  votes: integer("votes").default(0).notNull(),
  downvotes: integer("downvotes").default(0).notNull(),
  plays: integer("plays").default(0).notNull(),
  // REMOVED: tips column was causing database crash (does not exist in DB yet)
  approved: boolean("approved").default(false).notNull(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRantSchema = createInsertSchema(rantsTable).omit({
  id: true,
  rantNumber: true,
  votes: true,
  downvotes: true,
  plays: true,
  approved: true,
  featured: true,
  createdAt: true,
});
export type InsertRant = z.infer<typeof insertRantSchema>;
export type Rant = typeof rantsTable.$inferSelect;
