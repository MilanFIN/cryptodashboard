import {
    CoinDetails,
    getCoinDetails,
    getMultiple,
    getPriceHistory,
} from "@/app/actions/crypto";
import { getImages } from "@/app/actions/images";
import Bookmarked from "@/app/components/Bookmarked";
import { useTranslations } from "next-intl";
import { cookies } from "next/headers";

export default async function SavedCoins({}: {}) {
    const bookmarks = cookies().get("bookmarked");
    let values: Promise<CoinDetails[]>;
    let ids: string[] = [];
    if (bookmarks != null) {
        ids = bookmarks.value
            .split(",")
            .slice(0, 10)
            .filter((i) => i != "");
    }
    values = getMultiple(ids);

    //const ids = params.ids.split("%2C").slice(0, 10);
    //const values = (await getMultiple(ids)).sort((a, b) => a.rank - b.rank);

    const images = await getImages();

    return (
        <main className=" min-h-screen ">
            <div className=" xl:w-[800px] w-full mt-4">
                <Bookmarked icons={images} coins={values} />
            </div>
        </main>
    );
}
