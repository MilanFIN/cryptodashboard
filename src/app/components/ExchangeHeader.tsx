"use client";
import { Exchange } from "../actions/crypto";
import CurrencyProvider, {
    CurrencyContextType,
    useCurrencyContext,
} from "../context/CurrencyContextProvider";
import { formatNumber } from "../utils/common";

export default function ExchangeHeader(props: { exchanges: Exchange[] }) {
    const { sanitizeCurrency, currencySymbol } =
        useCurrencyContext() as CurrencyContextType;

    const volume = props.exchanges.reduce((acc: number, ex: Exchange) => {
        const value = !isNaN(ex.volume) ? ex.volume : 0;
        return acc + value;
    }, 0);

    return (
        <div className="flex flex-wrap my-auto mt-2">
            <div className="mr-2 bg-white shadow-lg border-2 rounded-md p-1 px-2 hover:bg-gray-100">Total Volume: {currencySymbol}{formatNumber(sanitizeCurrency(volume))}</div>
			<div className="bg-white shadow-lg border-2 rounded-md p-1 px-2 hover:bg-gray-100">Exchanges: {props.exchanges.length}</div>
        </div>
    );
}
