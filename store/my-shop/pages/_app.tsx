import "@/styles/globals.css";
import type { AppPropsWithLayout, AppProps } from "next/app";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Layout } from "@/components";
import { StateContext } from "@/context/StateContext";
import { SessionProvider } from "next-auth/react";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
    const getLayout =
        Component.getLayout ||
        ((page: React.ReactNode) => <Layout>{page}</Layout>);
    return (
        <SessionProvider session={session}>
            <StateContext>
                <Toaster />
                {getLayout(<Component {...pageProps} />)}
            </StateContext>
        </SessionProvider>
    );
}
