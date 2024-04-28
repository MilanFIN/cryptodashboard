"use client";
import { CoinDetails, Market } from "../actions/crypto";
import {
    CurrencyContextType,
    useCurrencyContext,
} from "../context/CurrencyContextProvider";
import SavedProvider, {
    SavedContext,
    SavedContextType,
    useSavedContext,
} from "../context/LocalContextProvider";
import Link from "next/link";
import { formatNumber } from "../utils/common";
import { InfoBox } from "./InfoBox";

export default function CoinInfo(props: { details: CoinDetails; img: string }) {
    const { sanitizeCurrency, currencySymbol } =
        useCurrencyContext() as CurrencyContextType;

    return (
        <div className="border-2 rounded-md p-4 w-full">
            <table>
                <tbody className="divide-y">
                    <tr>
                        <td>Rank: </td>
                        <td className="text-right">{props.details.rank}</td>
                    </tr>
                    <tr>
                        <td>Price:</td>
                        <td className="text-right">
                            {currencySymbol}
                            {formatNumber(
                                sanitizeCurrency(props.details.priceUsd)
                            )}
                            <span
                                className={`ml-2 ${
                                    props.details.changePercent24Hr < 0
                                        ? "text-red-500"
                                        : "text-green-500"
                                }`}
                            >
                                {props.details.changePercent24Hr.toFixed(2)}%
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>Market Cap:</td>
                        <td className="text-right">
                            {currencySymbol}
                            {formatNumber(
                                sanitizeCurrency(props.details.marketCapUsd)
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className="pr-4">Diluted valuation:</td>
                        <td className="text-right">
                            {!isNaN(props.details.maxSupply)
                                ? `${currencySymbol} 
                                    ${formatNumber(
                                        sanitizeCurrency(
                                            (props.details.marketCapUsd *
                                                props.details.maxSupply) /
                                                props.details.supply
                                        )
                                    )}`
                                : "?"}
                        </td>
                    </tr>
                    <tr>
                        <td>Supply: </td>
                        <td className="text-right">
                            {!isNaN(props.details.supply)
                                ? formatNumber(props.details.supply)
                                : "?"}
                        </td>
                    </tr>
                    <tr>
                        <td className="flex flex-wrap">
                            Total Supply:
                            <InfoBox>
                                <span>The total amount of coins that will be minted</span>
                            </InfoBox>
                        </td>
                        <td className="text-right">
                            {!isNaN(props.details.maxSupply)
                                ? formatNumber(props.details.maxSupply)
                                : "?"}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
