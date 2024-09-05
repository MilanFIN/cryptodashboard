"use client";
import { useTranslations } from "next-intl";
import { Exchange } from "../actions/crypto";
import CurrencyProvider, {
    CurrencyContextType,
    useCurrencyContext,
} from "../context/CurrencyContextProvider";
import { formatNumber } from "../utils/common";
import { useEffect, useState } from "react";

export default function ExchangeHeader(props: {
    exchanges: Promise<Exchange[]>;
}) {
    const t = useTranslations("Exchanges");

    const { sanitizeCurrency, currencySymbol } =
        useCurrencyContext() as CurrencyContextType;

    const [volume, setVolume] = useState<number | null>(null);
    const [exchangeCount, setExchangeCount] = useState<number | null>(null);
    /*props.exchanges.reduce((acc: number, ex: Exchange) => {
        const value = !isNaN(ex.volume) ? ex.volume : 0;
        return acc + value;
    }, 0);*/
    useEffect(() => {
        props.exchanges.then((e) => {
            setVolume(
                e.reduce((acc: number, ex: Exchange) => {
                    const value = !isNaN(ex.volume) ? ex.volume : 0;
                    return acc + value;
                }, 0)
            );
            setExchangeCount(e.length);
        });
    }, [props.exchanges]);

    return (
        <>
            <h1 className="text-xl mr-4">{t("Exchanges")}</h1>
            <div className="flex flex-wrap my-auto mt-2">
                <div className="mr-2 bg-white shadow-lg border-2 rounded-md p-1 px-2 hover:bg-gray-100">
                    {t("Total Volume: ")} {currencySymbol}
                    {volume != null
                        ? formatNumber(sanitizeCurrency(volume))
                        : "-"}
                </div>
                <div className="bg-white shadow-lg border-2 rounded-md p-1 px-2 hover:bg-gray-100">
                    {t("Exchanges:")}{" "}
                    {exchangeCount != null ? exchangeCount : "-"}
                </div>
            </div>
        </>
    );
}
