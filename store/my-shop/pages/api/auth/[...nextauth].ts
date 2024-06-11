import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession } from "next-auth";
import { baseUrl } from "../../../constants/url";

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
            diachi?: string | null | undefined;
        } & DefaultSession["user"];
    }
}

export const authOptions: NextAuthOptions = {
    debug: true,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
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
            async authorize(credentials: any) {
                const email = credentials?.email;
                const password = credentials?.password;

                const response = await fetch(
                    `${baseUrl}/store_customers/login`,
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
                `${baseUrl}/store_customers/${emailUser}`
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
