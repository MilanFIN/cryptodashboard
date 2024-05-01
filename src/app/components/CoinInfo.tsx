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
import { useTranslations } from "next-intl";

export default function CoinInfo(props: { details: CoinDetails; img: string }) {
    const t = useTranslations("Coin");

    const { sanitizeCurrency, currencySymbol } =
        useCurrencyContext() as CurrencyContextType;

    return (
        <div className="border-2 rounded-md p-4 w-full">
            <table>
                <tbody className="divide-y">
                    <tr>
                        <td>{t("Rank:")}</td>
                        <td className="text-right">{props.details.rank}</td>
                    </tr>
                    <tr>
                        <td>{t("Price:")}</td>
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
                        <td>{t("Market Cap:")}</td>
                        <td className="text-right">
                            {currencySymbol}
                            {formatNumber(
                                sanitizeCurrency(props.details.marketCapUsd)
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className="pr-4 flex flex-wrap">
                            {t("Diluted valuation:")}
                            <InfoBox>
                                <span>
                                    {t("EstimatedDilutedMarketCap")}
                                </span>
                            </InfoBox>
                        </td>
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
                        <td className="flex flex-wrap">
                            {t("Supply:")}
                            <InfoBox>
                                <span>
                                    {t("AmountOfCoinsMinted")}
                                </span>
                            </InfoBox>
                        </td>
                        <td className="text-right">
                            {!isNaN(props.details.supply)
                                ? formatNumber(props.details.supply)
                                : "?"}
                        </td>
                    </tr>
                    <tr>
                        <td className="flex flex-wrap">
                            {t("Total Supply:")}
                            <InfoBox>
                                <span>
                                    {t("TotalAmountOfCoinsToBeMinted")}
                                </span>
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
