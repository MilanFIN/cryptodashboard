import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SavedProvider from "./context/LocalContextProvider";
import NavBar from "./components/NavBar";
import ClientLayout from "./components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="w-full grid justify-items-center  mb-4">
                    <ClientLayout>
                        <NavBar />
                        {children}
                    </ClientLayout>
                </div>
            </body>
        </html>
    );
}
