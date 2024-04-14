import { getCoinDetails, getPriceHistory } from "@/app/actions/crypto";
import GraphView from "@/app/components/GraphView";
import Linechart from "@/app/components/Linechart";
import { Suspense } from "react";

export default async function Coin({ params }: { params: { id: string } }) {
    const details = await getCoinDetails(params.id);
    const initialPriceHistory = await getPriceHistory(params.id, "1m");

    return (
        <main className=" min-h-screen ">
            <ul>
                <li>{details.name}</li>
                <li>{details.priceUsd.toFixed(2)}</li>
            </ul>

            <Suspense fallback={<div>LOADING</div>}>
                <GraphView id={params.id} initial={initialPriceHistory} />
            </Suspense>

        </main>
    );
}
