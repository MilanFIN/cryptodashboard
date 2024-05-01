"use client";
import { Suspense, useContext } from "react";
import SavedProvider from "../context/LocalContextProvider";
import {Link} from "@/navigation"
import SavedLink from "./SavedLink";
import { CurrencyContext, CurrencyContextType, useCurrencyContext } from "../context/CurrencyContextProvider";
import CurrencySelector from "./CurrencySelector";
import { useTranslations } from "next-intl";
import LanguageSelector from "./LanguageSelector";

export default function NavBar() {
    const {currency, currencies, setCurrency } = useCurrencyContext() as CurrencyContextType;

    const t = useTranslations("Page")
    

    return (
        <div className="w-full  border-b-2 justify-items-center grid py-4">
            <div className="xl:w-[800px] w-full flex flex-wrap space-x-4">
                <Link href={`/`}>{t("Cryptocurrencies")}</Link>
                <SavedLink>{t("Bookmarked")}</SavedLink>
                <Link href={`/exchanges`}>{t("Exchanges")}</Link>
                <Link href={`/about`}>{t("About")}</Link>
                <span className="grow"></span>

                <LanguageSelector/>

                <CurrencySelector selected={currency} currencies={currencies} setCurrency={setCurrency}/>


            </div>
        </div>
    );
}

