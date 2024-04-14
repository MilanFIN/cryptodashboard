import {
    getCoinDetails,
    getMultiple,
    getPriceHistory,
} from "@/app/actions/crypto";
import Linechart from "@/app/components/Linechart";
import { Suspense } from "react";

export default async function Coin({ params }: { params: { ids: string } }) {
    const ids = params.ids.split("%2C").slice(0, 10);
    const values = (await getMultiple(ids)).sort((a, b) => a.rank - b.rank);

    return (
        <main className=" min-h-screen ">
            {values.map((i) => (
                <div>
                    {i.rank}, {i.id}, {i.priceUsd.toFixed(2)}
                </div>
            ))}
        </main>
    );
}
