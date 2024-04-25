import {
    getCoinDetails,
    getMultiple,
    getPriceHistory,
} from "@/app/actions/crypto";
import { getImages } from "@/app/actions/images";
import { DashboardRow } from "@/app/components/DashboardRow";
import DashboardTable from "@/app/components/DashboardTable";
import Linechart from "@/app/components/Linechart";
import { Suspense } from "react";

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
                <h1 className="text-xl mb-2">Favorite Cryptocurrencies</h1>

                <Suspense fallback={null}>
                    <div className="border-2 rounded-xl">
                        <DashboardTable
                            items={values}
                            icons={images}
                            showSaved={false}
                        />
                    </div>
                </Suspense>
            </div>
        </main>
    );
}
