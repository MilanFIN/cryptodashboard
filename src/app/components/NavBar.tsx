"use client";
import { Suspense } from "react";
import SavedProvider from "../context/LocalContextProvider";
import Link from "next/link";
import SavedLink from "./SavedLink";

export default function NavBar(props: {}) {
    return (
        <div className="w-full  border-b-2 justify-items-center grid py-4">
            <div className="xl:w-[800px] w-full flex flex-wrap space-x-4">
                <Link href="/">Cryptocurrencies</Link>
                <SavedLink>Favorites</SavedLink>
                <Link href="/about">About</Link>
                <span className="grow"></span>
                <span>Currency ($)</span>
            </div>
        </div>
    );
}
