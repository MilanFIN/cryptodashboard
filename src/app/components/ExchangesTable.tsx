"use client";
import { useEffect, useState } from "react";
import { CoinDetails, Exchange } from "../actions/crypto";
import { DashboardRow } from "./DashboardRow";
import { IconSource } from "../actions/images";
import Link from "next/link";
import { formatNumber } from "../utils/common";
import { InfoBox } from "./InfoBox";

type SortType = {
    col: number;
    ascending: boolean;
};

const columnHeaders = [
    <span>#</span>,
    <span>Name</span>,
    <span className="flex flex-wrap">
        Share %
        <InfoBox>Share of total trading volume during the last 24h</InfoBox>
    </span>,
    <span className="flex flex-wrap">
        Volume
        <InfoBox>Total trading volume during the last 24h</InfoBox>
    </span>,
    <span className="flex flex-wrap">
        Currencies
        <InfoBox>
            The amount of crypto-fiat pairs listed in the exchange
        </InfoBox>
    </span>,
];

export default function ExchangesTable(props: { items: Exchange[] }) {
    const [items, setItems] = useState<Exchange[]>([]);
    const [currentSort, setCurrentSort] = useState<SortType>({
        col: 0,
        ascending: true,
    });

    useEffect(() => {
        setItems(props.items);
    }, []);

    function sortBy(col: number) {
        if (currentSort.col === col) {
            setItems(items.toReversed());
            let newSortType = currentSort;
            newSortType.ascending = !newSortType.ascending;
            setCurrentSort(newSortType);
            return;
        }
        let newSortType: SortType = { col: col, ascending: true };

        if (col === 0) {
            setItems(items.toSorted((a, b) => a.rank - b.rank));
        } else if (col === 1) {
            setItems(items.toSorted((a, b) => a.name.localeCompare(b.name)));
        } else if (col === 2) {
            setItems(items.toSorted((a, b) => b.share - a.share));
            newSortType.ascending = false;
        } else if (col === 3) {
            setItems(items.toSorted((a, b) => b.volume - a.volume));
            newSortType.ascending = false;
        } else if (col === 4) {
            setItems(items.toSorted((a, b) => b.currencies - a.currencies));
            newSortType.ascending = false;
        }

        setCurrentSort(newSortType);
    }

    function getSortArrow(col: number) {
        if (col === currentSort.col) {
            return currentSort.ascending ? "\u25B2" : "\u25BC";
        } else {
            return "";
        }
    }

    return (
        <table className="w-full">
            <thead className="border-b-2">
                <tr>
                    {columnHeaders.map((i: React.ReactNode, ind: number) => (
                        <td
                            className="py-3 px-2 cursor-pointer"
                            onClick={() => sortBy(ind)}
                            key={"headercolumn_" + ind}
                        >
                            <span className="flex">
                                <span className="text-sm mr-1">
                                    {getSortArrow(ind)}
                                </span>
                                {i}
                            </span>
                        </td>
                    ))}
                </tr>
            </thead>
            {items.length > 0 ? (
                <tbody className="divide-y divide-solid divide-y-2">
                    {items.map((i) => (
                        <tr
                            key={"exchangerow_" + i.rank}
                            className="hover:bg-gray-100"
                        >
                            <td className="py-3 px-2">
                                <Link href={i.href} target="_blank">
                                    {i.rank}
                                </Link>
                            </td>
                            <td className="py-3 px-2">
                                <Link href={i.href} target="_blank">
                                    {i.name}
                                </Link>
                            </td>
                            <td className="py-3 px-2">
                                <Link href={i.href} target="_blank">
                                    {i.share.toFixed(2)}
                                </Link>
                            </td>{" "}
                            <td className="py-3 px-2">
                                <Link href={i.href} target="_blank">
                                    {!isNaN(i.volume)
                                        ? "$" + formatNumber(i.volume)
                                        : "?"}
                                </Link>
                            </td>
                            <td className="py-3 px-2">
                                <Link href={i.href} target="_blank">
                                    {!isNaN(i.currencies) ? i.currencies : "?"}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            ) : (
                <tbody></tbody>
            )}
        </table>
    );
}
