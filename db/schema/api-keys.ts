import {pgTable, text, timestamp} from "drizzle-orm/pg-core"
import {users} from "./auth"

export const apiKeys = pgTable ("apiKeys", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(()=>users.id),
    secretKey: text("secret_key").notNull().unique(),
    name: text("name").default("Default Key"),
    createdAt: timestamp("created_at").defaultNow()
})