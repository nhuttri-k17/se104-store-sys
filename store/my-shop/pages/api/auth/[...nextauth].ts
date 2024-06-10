import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            id?: string | null | undefined;
            giohangId?: string | null | undefined;
            sdt?: string | null | undefined;
        } & DefaultSession["user"];
    }
}

export const authOptions: NextAuthOptions = {
    // pages: {
    //     signIn: "/login",
    //     // signOut: "/signout",
    //     // error: "/auth-error",
    // },
    debug: true,
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password;

                // if (!credentials?.email || !credentials?.password) {
                //     // return { email, password };
                //     return null;
                // }

                const response = await fetch(
                    "http://localhost:8080/store_customers/login",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email: email,
                            password: password,
                        }),
                        headers: { "Content-Type": "application/json" },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to login");
                }

                const user = await response.json();
                // if (!user) {
                //     return null;
                // }

                return {
                    ...user,
                    id: user.id,
                    email: user.email,
                    name: user.ten,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            const emailUser = session.user.email;

            const khachhang = await fetch(
                `http://localhost:8080/store_customers/${emailUser}`
            ).then((res) => res.json());

            session.user.id = khachhang.id;
            session.user.giohangId = khachhang.giohangId;
            session.user.sdt = khachhang.sdt;

            const { image, ...rest } = session.user;
            session.user = { ...rest };
            return session;
        },
    },
};

export default NextAuth(authOptions);
