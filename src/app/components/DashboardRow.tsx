"use client";
import Link from "next/link";
import Image from 'next/image'
import { CoinDetails, DashboardRowContent } from "../actions/crypto";
import { SavedField } from "./Savedfield";
import { IconSource } from "../actions/images";
import { useEffect, useState } from "react";
import {
    CurrencyContextType,
    useCurrencyContext,
} from "../context/CurrencyContextProvider";

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
        } else {
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
                    <span className="font-bold mr-2">
                        {props.content.name}{" "}
                    </span>
                    {props.content.symbol}
                </Link>
            </td>
            <td className="py-3 px-2">
                <Link href={"/coin/" + props.content.id}>
                    {currencySymbol}
                    {sanitizeCurrency(props.content.priceUsd).toFixed(2)}
                </Link>
            </td>
            <td className="py-3 px-2">
                <Link href={"/coin/" + props.content.id}>
                    {currencySymbol}
                    {sanitizeCurrency(props.content.marketCapUsd).toFixed(0)}
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
                    {Math.abs(props.content.changePercent24Hr).toFixed(2) + "%"}
                </Link>
            </td>
        </>
    );
}
