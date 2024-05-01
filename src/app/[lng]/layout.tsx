import type { Metadata } from "next";
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

export default async function RootLayout({
    children,
    params: { lng },
}: {
    children: React.ReactNode;
    params: { lng: string };
}) {

    const rates = await getRates();


    return (
        <html lang={lng}>
            <body className={inter.className}>
                <div className="w-full grid justify-items-center mb-4">
                    <ClientLayout rates={rates} locale={lng}>
                        <NavBar/>
                        {children}
                    </ClientLayout>
                </div>
            </body>
        </html>
    );
}
