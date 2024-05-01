import {
    getCoinDetails,
    getMultiple,
    getPriceHistory,
} from "@/app/actions/crypto";
import { getImages } from "@/app/actions/images";
import Bookmarked from "@/app/components/Bookmarked";
import { DashboardRow } from "@/app/components/DashboardRow";
import DashboardTable from "@/app/components/DashboardTable";
import Linechart from "@/app/components/Linechart";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

export default async function SavedCoins({
    params,
}: {
    params: { ids: string };
}) {
    const ids = params.ids.split("%2C").slice(0, 10);
    const values = (await getMultiple(ids)).sort((a, b) => a.rank - b.rank);

    const images = await getImages();


    return (
        <main className=" min-h-screen ">
            <div className=" xl:w-[800px] w-full mt-4">
                <Bookmarked icons={images} coins={values}/>
            </div>
        </main>
    );
}
