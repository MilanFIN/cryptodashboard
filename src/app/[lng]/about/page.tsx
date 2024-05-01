import { useTranslations } from "next-intl";

export default function About() {
    const t = useTranslations("About");

    return (
        <div className=" xl:w-[800px] w-full mt-4">
            <h1 className="text-xl mb-2">{t("About")}</h1>
            <div>
                {t("API")} <a className="font-bold text-blue-500" href="https://docs.coincap.io/">Coincap</a>
            </div>
            <div>
                {t("CurrencyIcons")}{" "}
                <a className="font-bold text-blue-500" href="https://www.npmjs.com/package/cryptocurrency-icons">
                    npmjs
                </a>
            </div>
            <div>
                {t("RadixIcons")}{" "}
                <a className="font-bold text-blue-500" href="https://www.radix-ui.com/icons">Radix UI</a>
            </div>
        </div>
    );
}
