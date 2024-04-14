import { Suspense } from "react";
import { DashboardRowContent, getDashContent } from "../actions/crypto";
import { DashboardRow } from "./DashboardRow";
import DashboardTable from "./DashboardTable";

export default async function Dashboard(props: {page: number}) {

    const items = await getDashContent(props.page);

    return (
        <Suspense fallback={null}>
            <div className="w-full grid justify-items-center">
            <DashboardTable items={items}/>

            </div>
        </Suspense>
    );
}
