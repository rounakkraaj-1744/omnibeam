import {pgTable, text, timestamp, integer} from "drizzle-orm/pg-core"
import {users} from "./auth"

export const logs = pgTable ("logs", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(()=>users.id),

    channel: text("channel").notNull(),
    status: text("status").notNull(),

    to: text("to").notNull(),
    message: text("message").notNull(),

    attempts: integer("attempts").default(0),
    response: text("response"),   

    createdAt: timestamp("created_at").defaultNow()
})