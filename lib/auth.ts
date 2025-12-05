import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { users, accounts, sessions, verificationTokens } from "@/db/schema/auth";
import { Resend } from "resend";
import { db } from "@/db";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  db: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      users,
      accounts,
      sessions,
      verificationTokens,
    },
  }),

  baseURL: process.env.NEXT_PUBLIC_BASE_URL!, // e.g. https://signalforge.com

  email: {
    sendVerificationEmail: async ({ email, url }: { email: string, url: string }) => {
      await resend.emails.send({
        from: "SignalForge <noreply@signalforge.dev>",
        to: email,
        subject: "Verify your email",
        text: `Sign in link: ${url}`,
      });
    },
  },

  providers: {
    email: {
      generateVerificationTokenLength: 32,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  session: {
    strategy: "jwt",
    sessionTokenLength: 32,
    sessionTokenPrefix: "sglsess_",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },

  cookies: {
    session: {
      name: "sgl_session",
      secure: true,
      httpOnly: true,
      sameSite: "lax",
    },
  },

  user: {
    model: {
      id: true,
      email: true,
      emailVerified: true,
      createdAt: true,
    }
  }
});
