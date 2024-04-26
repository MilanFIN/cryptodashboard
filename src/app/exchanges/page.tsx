import { Suspense } from "react";
import ExchangesTable from "../components/ExchangesTable";
import { getExchanges } from "../actions/crypto";
import ExchangeHeader from "../components/ExchangeHeader";

export default async function Exchanges() {
    const exchanges = (await getExchanges()).sort((a, b) => a.rank - b.rank);

    return (
        <main className=" xl:w-[800px] w-full mt-4">
            <div className="flex flex-wrap mb-2">
            <h1 className="text-xl mr-4">Exchanges</h1>
            <ExchangeHeader exchanges={exchanges} />

            </div>

            <Suspense fallback={null}>

                <div className="border-2 rounded-xl">
                    <ExchangesTable items={exchanges} />
                </div>
            </Suspense>
        </main>
    );
}
