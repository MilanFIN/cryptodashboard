"use client";
import { Suspense, useContext } from "react";
import { Link } from "@/navigation";
import SavedLink from "./SavedLink";
import {
    CurrencyContext,
    CurrencyContextType,
    useCurrencyContext,
} from "../context/CurrencyContextProvider";
import CurrencySelector from "./CurrencySelector";
import { useTranslations } from "next-intl";
import LanguageSelector from "./LanguageSelector";

export default function NavBar() {
    const { currency, currencies, setCurrency } =
        useCurrencyContext() as CurrencyContextType;

    const t = useTranslations("Page");

    return (
        <div className="w-full  border-b-2 justify-items-center grid shadow-md">
            <div className="xl:w-[800px] w-full flex flex-wrap space-x-4 py-2">
                <Link
                    className="hover:bg-lime-300 py-1 px-2 rounded-2xl"
                    href={`/`}
                >
                    {t("Cryptocurrencies")}
                </Link>
                <span className="hover:bg-lime-300 py-1 px-2 rounded-2xl">
                    <SavedLink>{t("Bookmarked")}</SavedLink>
                </span>
                <Link
                    className="hover:bg-lime-300 py-1 px-2 rounded-2xl"
                    href={`/exchanges`}
                >
                    {t("Exchanges")}
                </Link>
                <Link
                    className="hover:bg-lime-300 py-1 px-2 rounded-2xl"
                    href={`/about`}
                >
                    {t("About")}
                </Link>
                <span className="grow"></span>

                <span>
                    <LanguageSelector />
                </span>

                <CurrencySelector
                    selected={currency}
                    currencies={currencies}
                    setCurrency={setCurrency}
                />
            </div>
        </div>
    );
}
