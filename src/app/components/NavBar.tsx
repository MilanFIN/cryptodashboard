"use client";
import { Suspense } from "react";
import SavedProvider from "../context/LocalContextProvider";
import Link from "next/link";
import SavedLink from "./SavedLink";

export default function NavBar(props: {}) {
    return (
        <div>
            <Link href="/">Main</Link>
            <SavedLink />
            <Link href="/about">About</Link>
        </div>
    );
}
