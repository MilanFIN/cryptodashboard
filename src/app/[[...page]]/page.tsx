import Link from "next/link";
import Dashboard from "../components/Dashboard";
import PageNavigation from "../components/PageNavigation";

export default function Home({ params }: { params: { page: string[] } }) {
    let page = 1;
    if (params.page !== undefined) {
        page = parseInt(params.page[0]);
    }
    if (page < 1) {
        page = 1;
    }
    return (
        <main className=" min-h-screen ">
            <Dashboard page={page} />
            <PageNavigation page={page}/>

        </main>
    );
}
