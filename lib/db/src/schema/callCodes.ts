import { pgTable, text, uuid, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { callersTable } from "./callers";
import { rantsTable } from "./rants";

export const callCodesTable = pgTable("call_codes", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").notNull().unique(),
  callerId: uuid("caller_id").references(() => callersTable.id),
  plan: text("plan").notNull(),
  category: text("category"),
  stripeSessionId: text("stripe_session_id"),
  used: boolean("used").default(false).notNull(),
  rantId: uuid("rant_id").references(() => rantsTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

export const insertCallCodeSchema = createInsertSchema(callCodesTable).omit({ id: true, used: true, createdAt: true });
export type InsertCallCode = z.infer<typeof insertCallCodeSchema>;
export type CallCode = typeof callCodesTable.$inferSelect;
