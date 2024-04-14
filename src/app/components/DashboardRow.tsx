"use client";
import Link from "next/link";
import { CoinDetails, DashboardRowContent } from "../actions/crypto";
import { SavedField } from "./Savedfield";

export function DashboardRow(props: { content: CoinDetails }) {
    return (
        <>
            <td className="py-3 px-2">
                <Link href={"/coin/" + props.content.id}>
                    {props.content.rank}
                </Link>
            </td>
            <td className="py-3 px-2">
                <Link href={"/coin/" + props.content.id}>
                    <span className="font-bold">{props.content.name} </span>
                    {props.content.symbol}
                </Link>
            </td>
            <td className="py-3 px-2">
                <Link href={"/coin/" + props.content.id}>
                    ${props.content.priceUsd.toFixed(2)}
                </Link>
            </td>
            <td className="py-3 px-2">
                <Link href={"/coin/" + props.content.id}>
                ${props.content.marketCapUsd.toFixed(0)}
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
            <td className="py-3 px-2">
                <SavedField id={props.content.id} />
            </td>
        </>
    );
}

/*
            

*/
