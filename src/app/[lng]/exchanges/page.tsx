import { Suspense } from "react";
import ExchangesTable from "../../components/ExchangesTable";
import { getExchanges } from "../../actions/crypto";
import ExchangeHeader from "../../components/ExchangeHeader";

export default async function Exchanges() {
    const exchanges = (await getExchanges()).sort((a, b) => a.rank - b.rank);

    return (
        <div className=" xl:w-[800px] w-full mt-4">
            <div className=" mb-2">

                <ExchangeHeader exchanges={exchanges} />
            </div>
            <Suspense fallback={null}>
                <div className="border-2 rounded-xl w-full justify-center flex ">
                    <ExchangesTable items={exchanges} />
                </div>
            </Suspense>
        </div>
    );
}

/*


*/