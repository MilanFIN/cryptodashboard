"use client";
import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/UseLocalStorage";
import { Rate } from "../actions/crypto";

export type CurrencyContextType = {
    currency: string;
    currencies: string[];
    setCurrency: (f: number) => void;
    sanitizeCurrency: (v: number) => number;
    currencySymbol: string;
};

export const CurrencyContext = React.createContext<CurrencyContextType | null>(
    null
);
export const useCurrencyContext = () => useContext(CurrencyContext);

function CurrencyProvider(props: { children: React.ReactNode; rates: Rate[] }) {
    const currencies = props.rates.map((i) => i.name);

    const usdIndex = props.rates.findIndex(
        (i) => i.id === "united-states-dollar"
    );

    const [activeCurrency, setActiveCurrency] = useState<number>(usdIndex);

    //const [saved, setSaved] = useLocalStorage("saved", new Array<string>());
    const [currency, setCurrencyState] = useState<string>(
        props.rates[usdIndex].name
    );
    const [currencySymbol, setCurrencySymbol] = useState<string>(
        props.rates[usdIndex].symbol
    );

    function setCurrency(c: number) {
        setCurrencyState(props.rates[c].name);
        setActiveCurrency(c);
        setCurrencySymbol(props.rates[c].symbol);
    }

    function sanitizeCurrency(v: number) {
        return v / props.rates[activeCurrency].rate;
    }

    return (
        <CurrencyContext.Provider
            value={{
                currency,
                currencies,
                setCurrency,
                sanitizeCurrency,
                currencySymbol,
            }}
        >
            {props.children}
        </CurrencyContext.Provider>
    );
}

export default CurrencyProvider;
