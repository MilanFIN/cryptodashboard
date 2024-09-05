"use client";
import { Suspense, useEffect, useState } from "react";
import { CoinDetails } from "../actions/crypto";
import { DashboardRow } from "./DashboardRow";
import { IconSource } from "../actions/images";
import { useTranslations } from "next-intl";

type SortType = {
    col: number;
    ascending: boolean;
};

export default function DashboardTable(props: {
    items: Promise<CoinDetails[]>;
    icons: IconSource[];
    showSaved: boolean;
}) {
    const t = useTranslations("Page");

    const columnHeaders = ["#", "Name", "Price", "Market Cap", "Change 24h"];

    const [items, setItems] = useState<CoinDetails[]>([]);
    const [currentSort, setCurrentSort] = useState<SortType>({
        col: 0,
        ascending: true,
    });

    useEffect(() => {
        async function set(items: Promise<CoinDetails[]>) {
            setItems(await items);
        }
        set(props.items);
    }, [props.items]);

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
            setItems(items.toSorted((a, b) => b.priceUsd - a.priceUsd));
            newSortType.ascending = false;
        } else if (col === 3) {
            setItems(items.toSorted((a, b) => b.marketCapUsd - a.marketCapUsd));
            newSortType.ascending = false;
        } else if (col === 4) {
            setItems(
                items.toSorted(
                    (a, b) => b.changePercent24Hr - a.changePercent24Hr
                )
            );
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
        <table className="w-full overflow-x-scroll px-2 ">
            <thead className="border-b-2">
                <tr>
                    {columnHeaders.map((i: string, ind: number) => (
                        <td
                            className="py-3 px-2 cursor-pointer"
                            onClick={() => sortBy(ind)}
                            key={"headercolumn_" + ind}
                        >
                            <span className="text-sm mr-1">
                                {getSortArrow(ind)}
                            </span>
                            {t(i)}
                        </td>
                    ))}
                </tr>
            </thead>
            <Suspense fallback={<tbody></tbody>}>
                <tbody className="divide-y divide-solid divide-y-2">
                    {items.length > 0 ? (
                        items
                            .filter((i) => i.symbol != null)
                            .map((i) => (
                                <tr
                                    key={"contentrow_" + i.symbol}
                                    className="hover:bg-gray-100"
                                >
                                    {
                                        <DashboardRow
                                            content={i}
                                            icons={props.icons}
                                            showSaved={props.showSaved}
                                        />
                                    }
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    )}
                </tbody>
            </Suspense>
        </table>
    );
}
