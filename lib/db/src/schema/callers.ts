import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const callersTable = pgTable("callers", {
  id: uuid("id").primaryKey().defaultRandom(),
  phone: text("phone"),
  email: text("email"),
  nickname: text("nickname"),
  city: text("city"),
  state: text("state"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCallerSchema = createInsertSchema(callersTable).omit({ id: true, createdAt: true });
export type InsertCaller = z.infer<typeof insertCallerSchema>;
export type Caller = typeof callersTable.$inferSelect;
