import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="layout">
            <Head>
                <title>Gloss and Glam</title>
            </Head>
            <header>
                <Navbar />
            </header>
            <main className="main-container pt-[50px]">{children}</main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;
