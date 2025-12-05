import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
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

  baseURL: process.env.NEXT_PUBLIC_BASE_URL!, // e.g. https://omnibeam.rounakk.in

  email: {
    sendVerificationEmail: async ({ email, url }: { email: string, url: string }) => {
      await resend.emails.send({
        from: "omnibeam <noreply@omnibeam.dev>",
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
    // strategy: "jwt", // inferred/default or invalid key
    // sessionTokenLength: 32, // Invalid or default
    // sessionTokenPrefix: "sglsess_", // Invalid or default
    // maxAge: 60 * 60 * 24 * 7, // 7 days (might be valid but simplifying)
    expiresIn: 60 * 60 * 24 * 7, // Try standard naming if maxAge failed, or just rely on defaults
    updateAge: 60 * 60 * 24, // 1 day
  },

  cookies: {
    session: {
      name: "sgl_session",
      secure: true,
      httpOnly: true,
      sameSite: "lax",
    },
  },

  // user: {
  //   model: { ... } // Invalid property 'model'
  // }
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }) => {
        await resend.emails.send({
          from: "omnibeam <noreply@omnibeam.dev>",
          to: email,
          subject: "Sign in to OmniBeam",
          text: `Click only this link to sign in: ${url}`,
        });
      }
    })
  ]
});
