"use client";
import { Link } from "@/navigation";
import Image from "next/image";
import { CoinDetails, DashboardRowContent } from "../actions/crypto";
import { SavedField } from "./Savedfield";
import { IconSource } from "../actions/images";
import { useEffect, useState } from "react";
import {
    CurrencyContextType,
    useCurrencyContext,
} from "../context/CurrencyContextProvider";
import { formatNumber } from "../utils/common";

export function DashboardRow(props: {
    content: CoinDetails;
    icons: IconSource[];
    showSaved: boolean;
}) {
    const { sanitizeCurrency, currencySymbol } =
        useCurrencyContext() as CurrencyContextType;

    const [img, setImg] = useState("");

    useEffect(() => {
        if (
            props.icons.some(
                (i) => i.symbol === props.content.symbol.toLowerCase()
            )
        ) {
            setImg(
                props.icons.filter(
                    (i) => i.symbol === props.content.symbol.toLowerCase()
                )[0].content
            );
        } else if (props.icons.length > 0) {
            setImg(
                props.icons.filter((i) => i.symbol === "generic")[0].content
            );
        }
    });

    return (
        <>
            <td className="py-3 px-2">
                <Link href={"/coin/" + props.content.id}>
                    {props.content.rank}
                </Link>
            </td>
            <td className="py-3 px-2 flex ">
                {props.showSaved ? <SavedField id={props.content.id} /> : null}

                <Link
                    href={"/coin/" + props.content.id}
                    className="flex flex-wrap"
                >
                    <Image
                        src={`data:image/svg+xml;base64,${btoa(img)}`}
                        width="25"
                        height="25"
                        className="mr-2"
                        alt="Currency icon"
                    ></Image>
                    <span
                        className="font-bold mr-2"
                        id={"row_name_" + props.content.id}
                    >
                        {props.content.name}{" "}
                    </span>
                    {props.content.symbol}
                </Link>
            </td>
            <td className="py-3 px-2">
                <Link href={"/coin/" + props.content.id}>
                    <span id={"row_price_" + props.content.id} data-testid={"row_price_" + props.content.id}>
                        {currencySymbol}
                        {formatNumber(sanitizeCurrency(props.content.priceUsd))}
                    </span>
                </Link>
            </td>
            <td className="py-3 px-2">
                <Link href={"/coin/" + props.content.id}>
                    <span id={"row_marketcap_" + props.content.id} data-testid={"row_marketcap_" + props.content.id}>
                        {currencySymbol}
                        {formatNumber(
                            sanitizeCurrency(props.content.marketCapUsd)
                        )}
                    </span>
                </Link>
            </td>
            <td
                className={`${
                    props.content.changePercent24Hr >= 0
                        ? "text-green-500"
                        : "text-red-500"
                } py-3 px-2`}
            >
                <Link href={"/coin/" + props.content.id}>
                    <span id={"row_percentage_" + props.content.id} data-testid={"row_percentage_" + props.content.id}>
                        {Math.abs(props.content.changePercent24Hr).toFixed(2) +
                            "%"}
                    </span>
                </Link>
            </td>
        </>
    );
}
