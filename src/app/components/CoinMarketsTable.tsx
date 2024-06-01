import { InfoBox } from "./InfoBox";
import { useTranslations } from "next-intl";

export default function CoinMarketsTable(props: { markets: string[] }) {
    const t = useTranslations("Coin");
    return (
        <div className=" w-full border-2 rounded-md p-2">
            <div className="flex flex-wrap px-1">
                {t("Markets")}{" "}
                <InfoBox>
                    <span>{t("ExchangesWithCoinListed")}</span>
                </InfoBox>
            </div>
            <div className="flex flex-wrap">
                {props.markets.map((m: string) => (
                    <div className="bg-gray-300 m-1 rounded-md px-1">{m}</div>
                ))}
            </div>
        </div>
    );
}
