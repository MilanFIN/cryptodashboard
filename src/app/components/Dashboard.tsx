import { Suspense } from "react";
import { DashboardRowContent, getDashContent } from "../actions/crypto";
import { DashboardRow } from "./DashboardRow";
import DashboardTable from "./DashboardTable";
import { getImages } from "../actions/images";

export default async function Dashboard(props: { page: number }) {
    const images = await getImages();

    const items = await getDashContent(props.page);

    return (
        <div className="w-full grid justify-items-center">
            <Suspense fallback={null}>
                <DashboardTable items={items} icons={images} />
            </Suspense>
        </div>
    );
}
