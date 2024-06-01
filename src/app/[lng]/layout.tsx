import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SavedProvider from "../context/LocalContextProvider";
import NavBar from "../components/NavBar";
import ClientLayout from "../components/ClientLayout";
import { getRates } from "../actions/crypto";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Cryptocurrency dashboard",
    description: "tbd",
};

export const viewport: Viewport = {
    width: '800px',
};

export default async function RootLayout({
    children,
    params: { lng },
}: {
    children: React.ReactNode;
    params: { lng: string };
}) {
    const rates = await getRates();

    return (
        <html lang={lng} className="min-w-[800px]">
            <body className={inter.className}>
                <ClientLayout rates={rates} locale={lng}>
                    <NavBar />
                    <div className="grid justify-items-center mb-4 px-2">
                        {children}
                    </div>
                </ClientLayout>
            </body>
        </html>
    );
}
