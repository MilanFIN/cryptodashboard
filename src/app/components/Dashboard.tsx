import { Suspense } from "react";
import { DashboardRowContent, getDashContent } from "../actions/crypto";
import { DashboardRow } from "./DashboardRow";
import DashboardTable from "./DashboardTable";
import { getImages } from "../actions/images";

export default async function Dashboard(props: { page: number }) {
    const images = await getImages();

    const items = await getDashContent(props.page);


    return (
        <div className=" xl:w-[800px] w-full mt-4">
            <h1 className="text-xl mb-2">All Cryptocurrencies</h1>
            <Suspense fallback={null}>
                <div className="border-2 rounded-xl">
                    <DashboardTable
                        items={items}
                        icons={images}
                        showSaved={true}
                    />
                </div>
            </Suspense>
        </div>
    );
}
