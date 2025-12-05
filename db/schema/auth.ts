import {pgTable, text, boolean, timestamp} from "drizzle-orm/pg-core"

export const users = pgTable ("users", {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false),
    createdAt: timestamp("created_at").defaultNow()
})

export const accounts = pgTable ("accounts", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(()=>users.id),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    expiresAt: timestamp("expires_at")
})

export const sessions = pgTable ("sessions", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(()=>users.id),
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("created_at").defaultNow()
})

export const verificationTokens = pgTable ("accounts", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expiresAt: timestamp("expires_at")
})