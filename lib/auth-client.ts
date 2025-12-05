import { createAuthClient } from "better-auth/react"
import { magicLinkClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL, // the base url of your auth server
    plugins: [
        magicLinkClient()
    ]
})

export const { signIn, signUp, useSession } = authClient;
