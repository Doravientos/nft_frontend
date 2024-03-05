import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

import { Providers } from "@/components/providers";
import { Navbar, Footer } from "@/components/index";
import Script from "next/script";

import { NFTProvider } from "../../context/NftContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ENMA Galaxy",
    description: "A place to transact with NFT on blockchain",
    icons: "./favicon.ico",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <NFTProvider>
                    <Providers>
                        <div className="min-h-screen bg-white text-black dark:bg-nft-dark dark:text-white">
                            <Navbar />
                            <div className="pt-65">{children}</div>
                            <Footer />
                        </div>
                        <Script
                            src="https://kit.fontawesome.com/286152895a.js"
                            crossOrigin="anonymous"
                        ></Script>
                    </Providers>
                </NFTProvider>
            </body>
        </html>
    );
}
