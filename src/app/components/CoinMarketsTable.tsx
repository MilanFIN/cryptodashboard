import { InfoBox } from "./InfoBox";
import { useTranslations } from "next-intl";

export default function CoinMarketsTable(props: { markets: string[] }) {

    const t = useTranslations("Coin")
    return (
        <div className="border-2 rounded-md flex flex-wrap w-full">
            <div className="w-full p-2 flex flex-wrap">
                {t("Markets")} <InfoBox><span>{t("ExchangesWithCoinListed")}</span></InfoBox>
            </div>
                {props.markets.map((m: string) => (
                    <div className="bg-gray-300 m-1 rounded-md px-1">{m}</div>
                ))}
        </div>
    );
}
