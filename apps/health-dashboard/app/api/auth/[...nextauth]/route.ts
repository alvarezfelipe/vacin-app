import prisma from "@/db/instance"
import { Common } from "database"
import NextAuth, { type NextAuthOptions } from "next-auth"
import type { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import { z } from "zod"

const CredentialsSchema = z.object({
    username: z.string().length(6),
    password: z.string().min(1)
})

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            type: "credentials",
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {},
            async authorize(credentials, req) {

                const { username, password } = credentials as z.infer<typeof CredentialsSchema>
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                try {
                    CredentialsSchema.parse({ username, password })

                    return await prisma.entity.signIn(username, password)
                } catch (err) {
                    throw new Error("Acesso negado. Verifique suas credenciais.")
                }
            }
        })],
    callbacks: {
        async jwt({ token, user }: { token: JWT, user: any }) {
            if (user) {
                token.user = exclude(user as Common, ['password'])
            }

            return token
        },
        async session({ session, token }: { session: any, token: JWT }) {
            session.user = token.user as Omit<Common, 'password'>

            return session
        }
    },
    pages: {
        signIn: "/",
        error: "/"
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }