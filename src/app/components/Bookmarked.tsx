import { Suspense } from "react";
import DashboardTable from "./DashboardTable";
import { CoinDetails } from "../actions/crypto";
import { IconSource } from "../actions/images";
import { useTranslations } from "next-intl";

export default function Bookmarked(props: {coins: CoinDetails[], icons: IconSource[]}) {

	const t = useTranslations("Page")
    return (
        <>
            <h1 className="text-xl mb-2">{t("Bookmarked Cryptocurrencies")}</h1>

            <Suspense fallback={null}>
                <div className="border-2 rounded-xl">
                    <DashboardTable
                        items={props.coins}
                        icons={props.icons}
                        showSaved={false}
                    />
                </div>
            </Suspense>
        </>
    );
}
