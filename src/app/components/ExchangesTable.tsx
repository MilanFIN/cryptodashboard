"use client";
import { useEffect, useState } from "react";
import { CoinDetails, Exchange } from "../actions/crypto";
import { DashboardRow } from "./DashboardRow";
import { IconSource } from "../actions/images";
import { Link } from "@/navigation";
import { formatNumber } from "../utils/common";
import { InfoBox } from "./InfoBox";
import { useTranslations } from "next-intl";

type SortType = {
    col: number;
    ascending: boolean;
};

export default function ExchangesTable(props: { items: Promise<Exchange[]> }) {
    const t = useTranslations("Exchanges");

    const columnHeaders = [
        <span>{t("#")}</span>,
        <span>{t("Name")}</span>,
        <span className="flex flex-wrap">
            {t("Share %")}
            <InfoBox>
                <span id="shareoftotalvolumeinfo">
                    {t("ShareOfTotalVolume")}
                </span>
            </InfoBox>
        </span>,
        <span className="flex flex-wrap">
            {t("Volume")}
            <InfoBox>{t("TotalTradingVolume")}</InfoBox>
        </span>,
        <span className="flex flex-wrap">
            {t("Currencies")}
            <InfoBox>{t("AmountOfCryptoFiatPairs")}</InfoBox>
        </span>,
    ];

    const [items, setItems] = useState<Exchange[]>([]);
    const [currentSort, setCurrentSort] = useState<SortType>({
        col: 0,
        ascending: true,
    });

    useEffect(() => {
        async function loadItems(items: Promise<Exchange[]>) {
            setItems(await items);
        }
        loadItems(props.items);
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
        <table className="w-full overflow-x-scroll">
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
                            </td>
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
