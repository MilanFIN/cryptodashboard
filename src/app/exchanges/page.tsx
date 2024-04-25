import { Suspense } from "react";
import { getImages } from "../actions/images";
import DashboardTable from "../components/DashboardTable";
import ExchangesTable from "../components/ExchangesTable";
import { getExchanges } from "../actions/crypto";

export default async function Exchanges() {

	const exchanges = await getExchanges();

    return (
        <main className=" xl:w-[800px] w-full mt-4">
            <h1 className="text-xl mb-2">Exchanges</h1>
            <Suspense fallback={null}>
                <div className="border-2 rounded-xl">
                    <ExchangesTable items={exchanges}/>
                </div>
            </Suspense>
        </main>
    );
}
