import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";


export const audit_logs = pgTable("audit_logs",{
    id: uuid("uuid").primaryKey(),
    action: text("action").notNull(),
    user_id: text("user_id").notNull(),
    timestamp: timestamp("timestamp").notNull().defaultNow(),
    ip_address: text("ip_address").notNull(),
})