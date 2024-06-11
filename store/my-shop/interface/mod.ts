import type { NextPage, NextPageWithLayout } from "next";
import type { AppProps } from "next/app";

declare module "next" {
    type NextPageWithLayout = NextPage & {
        getLayout?: (page: React.ReactNode) => React.ReactNode;
    };
}

declare module "next/app" {
    type AppPropsWithLayout = AppProps & {
        Component: NextPageWithLayout;
    };
}
