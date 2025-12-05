import {pgTable, text, boolean, timestamp} from "drizzle-orm/pg-core"
import {users} from "./auth"

export const channelConfig = pgTable ("channelConfig", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(()=>users.id),

    //email
    emailEnabled: boolean("email_enabled").default(false),
    resendApiKey: text ("resend_api_key"),

    //slack
    slackEnabled: boolean("slack_enabled").default(false),
    slackAccessToken: text ("slack_access_token"),

    //push
    pushEnabled: boolean("push_enabled").default(false),
    vapidPublicKey: text("vapid_public_key"),
    vapidPrivateKey: text("vapid_private_key"),

    createdAt: timestamp("created_at").defaultNow(),
})