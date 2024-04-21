import { getCoinDetails, getPriceHistory } from "@/app/actions/crypto";
import { getImages } from "@/app/actions/images";
import GraphView from "@/app/components/GraphView";
import Linechart from "@/app/components/Linechart";
import { Suspense } from "react";

export default async function Coin({ params }: { params: { id: string } }) {
    const details = await getCoinDetails(params.id);
    const images = await getImages();
    const initialPriceHistory = await getPriceHistory(params.id, "1m");

    let img = "";

    if (images.some((i) => i.symbol === details.symbol.toLowerCase())) {
        img = images.filter((i) => i.symbol === details.symbol.toLowerCase())[0]
            .content;
    }

    return (
        <main className=" min-h-screen xl:w-[800px] w-full mt-4">
            <div className="flex flex-wrap w-full">
                <div className="">
                    <table>
                        <tbody>
                            <tr>
                                <td className="flex">
                                    <img
                                        src={`data:image/svg+xml;base64,${btoa(
                                            img
                                        )}`}
                                        width="25"
                                        height="25"
                                        className="mr-2"
                                    ></img>
                                    <span className="font-bold mr-2">
                                        {details.name}
                                    </span>
                                    {details.symbol}
                                </td>
                            </tr>
                            <tr>
                                <td>Rank: </td>
                                <td>{details.rank}</td>
                            </tr>
                            <tr>
                                <td>Price:</td>
                                <td>${details.priceUsd.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Market Cap:</td>
                                <td>${details.marketCapUsd.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Fully Diluted valuation:</td>
                                <td>${(details.marketCapUsd * details.maxSupply/details.supply).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Supply: </td>
                                <td>{details.supply}</td>
                            </tr>
                            <tr>
                                <td>Total Supply: </td>
                                <td>{details.maxSupply}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <Suspense fallback={<div>LOADING</div>}>
                    <GraphView id={params.id} initial={initialPriceHistory} />
                </Suspense>
            </div>
        </main>
    );
}
