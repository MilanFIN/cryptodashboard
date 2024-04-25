"use client";

import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/UseLocalStorage";
import { getRates } from "../actions/crypto";

export type CurrencyContextType = {
    currency: string;
    currencies: string[];
    setCurrency: (f: number) => void;
    sanitizeCurrency: (v: number) => number;
};

export const CurrencyContext = React.createContext<CurrencyContextType | null>(
    null
);
export const useCurrencyContext = () => useContext(CurrencyContext);

const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {

    //const cs = await getRates();
    const currencies = ["usd", "euro"];
    const multipliers = [1, 0.5];

    //const [saved, setSaved] = useLocalStorage("saved", new Array<string>());
    const [currency, setCurrencyState] = useState<string>(currencies[0]);

    const [multiplier, setMultiplier] = useState(multipliers[0]);

    function setCurrency(c: number) {
        setCurrencyState(currencies[c]);
        setMultiplier(multipliers[c]);
    }

    function sanitizeCurrency(v: number) {
        return multiplier * v;
    }

    return (
        <CurrencyContext.Provider
            value={{ currency, currencies, setCurrency, sanitizeCurrency }}
        >
            {children}
        </CurrencyContext.Provider>
    );
};

export default CurrencyProvider;
