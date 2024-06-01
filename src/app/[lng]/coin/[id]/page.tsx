import {
    getCoinDetails,
    getCoinMarkets,
    getPriceHistory,
} from "@/app/actions/crypto";
import { getImages } from "@/app/actions/images";
import CoinInfo from "@/app/components/CoinInfo";
import CoinMarketsTable from "@/app/components/CoinMarketsTable";
import GraphView from "@/app/components/GraphView";
import Linechart from "@/app/components/Linechart";
import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Coin({ params }: { params: { id: string } }) {
    const details = await getCoinDetails(params.id);
    if (details === null) {
        return notFound();
    }
    const markets = await getCoinMarkets(params.id);
    const images = await getImages();
    const initialPriceHistory = await getPriceHistory(params.id, "1m");

    let img = "";

    if (images.some((i) => i.symbol === details.symbol.toLowerCase())) {
        img = images.filter((i) => i.symbol === details.symbol.toLowerCase())[0]
            .content;
    }

    return (
        <main className=" min-h-screen xl:w-[800px] w-full mt-2 px-2">
            <div className="flex m-2">
                <Image
                    src={`data:image/svg+xml;base64,${btoa(img)}`}
                    width="32"
                    height="32"
                    className="mr-2"
                    alt="Currency icon"
                ></Image>
                <span className="font-bold mr-2 text-2xl my-auto">
                    {details.name}
                </span>
                <span className="text-xl my-auto">{details.symbol}</span>
            </div>

            <div className="xl:flex">
                <div className="w-fit">
                    <CoinInfo img={img} details={details} />
                </div>
                <div className="w-full mt-2 xl:mt-0">
                    <Suspense fallback={null}>
                        <CoinMarketsTable markets={markets} />
                    </Suspense>
                </div>
            </div>
            <Suspense fallback={<div>LOADING</div>}>
                <GraphView id={params.id} initial={initialPriceHistory} />
            </Suspense>
        </main>
    );
}
