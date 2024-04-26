"use client";
import { Suspense, useContext } from "react";
import SavedProvider from "../context/LocalContextProvider";
import Link from "next/link";
import SavedLink from "./SavedLink";
import { CurrencyContext, CurrencyContextType, useCurrencyContext } from "../context/CurrencyContextProvider";
import CurrencySelector from "./CurrencySelector";

export default function NavBar(props: {}) {
    const {currency, currencies, setCurrency } = useCurrencyContext() as CurrencyContextType;

    return (
        <div className="w-full  border-b-2 justify-items-center grid py-4">
            <div className="xl:w-[800px] w-full flex flex-wrap space-x-4">
                <Link href="/">Cryptocurrencies</Link>
                <SavedLink>Favorites</SavedLink>
                <Link href="/exchanges">Exchanges</Link>
                <Link href="/about">About</Link>
                <span className="grow"></span>

                <CurrencySelector selected={currency} currencies={currencies} setCurrency={setCurrency}/>


            </div>
        </div>
    );
}

