import { db } from "@workspace/db";
import { activityLogTable } from "@workspace/db";

export async function logActivity(type: string, message: string, metadata?: Record<string, unknown>) {
  try {
    await db.insert(activityLogTable).values({ type, message, metadata: metadata ?? {} });
  } catch (err) {
    console.error("Failed to log activity:", err);
  }
}
