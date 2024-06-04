import Dashboard from "../../components/Dashboard";
import PageNavigation from "../../components/PageNavigation";

import {useTranslations} from 'next-intl';

export default function Home({ params }: { params: { page: string[], lng: string } }) {

    const t = useTranslations('Page');

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
            <PageNavigation page={page} lng={params.lng}/>

        </main>
    );
}
