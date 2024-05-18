import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CoinInfo from "@/app/components/CoinInfo";

import enMessages from "@/translations/en.json";
import { NextIntlClientProvider, useMessages } from "next-intl";
import CurrencyContextProvider, {
    CurrencyContextType,
    useCurrencyContext,
} from "@/app/context/CurrencyContextProvider";
import { DashboardRow } from "@/app/components/DashboardRow";

describe("Coin Info", () => {
    it("Check that coin info renders correctly using the correct translations and currency formatting", () => {
        render(
            <CurrencyContextProvider
                rates={[
                    {
                        id: "united-states-dollar",
                        name: "usd",
                        symbol: "$",
                        rate: 1.0,
                    },
                ]}
            >
                <NextIntlClientProvider locale={"en"} messages={enMessages}>
                    <CoinInfo
                        details={{
                            id: "coin",
                            rank: 1,
                            symbol: "btc",
                            name: "bitcoin",
                            supply: 1,
                            maxSupply: 2,
                            marketCapUsd: 3,
                            volumeUsd24Hr: 4,
                            priceUsd: 5,
                            changePercent24Hr: -10,
                        }}
                        img={""}
                    />
                </NextIntlClientProvider>
            </CurrencyContextProvider>
        );

        const rankCell = screen.getByText("Rank:");
        const valueCell = rankCell.parentElement!.querySelector("td + td");
        const value = valueCell!.textContent!.trim();
        expect(valueCell!.textContent!.trim()).toBe("1");
    });
});

describe("Coin row formatting", () => {
    it("Check coin row data formatting", () => {
        render(
            <CurrencyContextProvider
                rates={[
                    {
                        id: "united-states-dollar",
                        name: "usd",
                        symbol: "$",
                        rate: 1.0,
                    },
                ]}
            >
                <NextIntlClientProvider locale={"en"} messages={enMessages}>
                    <table>
                        <tbody>
                            <tr>
                                <DashboardRow
                                    content={{
                                        id: "bitcoin",
                                        rank: 1,
                                        symbol: "BTC",
                                        name: "Bitcoin",
                                        supply: 1,
                                        maxSupply: 1,
                                        marketCapUsd: 1000000,
                                        volumeUsd24Hr: 0,
                                        priceUsd: 60001.019,
                                        changePercent24Hr: 12.511,
                                    }}
                                    icons={[]}
                                    showSaved={false}
                                />
                            </tr>
                        </tbody>
                    </table>
                </NextIntlClientProvider>
            </CurrencyContextProvider>
        );

        
        const spanElement = screen.getByTestId("row_price_bitcoin");
        expect(spanElement).toHaveTextContent('$60001.02');

        const mSpanElement = screen.getByTestId("row_marketcap_bitcoin");
        expect(mSpanElement).toHaveTextContent('$1.00M');

    });
});

describe("Coin row formatting with small values", () => {
    it("Check coin row data formatting with small values", () => {
        render(
            <CurrencyContextProvider
                rates={[
                    {
                        id: "united-states-dollar",
                        name: "usd",
                        symbol: "$",
                        rate: 1.0,
                    },
                ]}
            >
                <NextIntlClientProvider locale={"en"} messages={enMessages}>
                    <table>
                        <tbody>
                            <tr>
                                <DashboardRow
                                    content={{
                                        id: "doge",
                                        rank: 1,
                                        symbol: "DOGE",
                                        name: "Dogecoin",
                                        supply: 1,
                                        maxSupply: 1,
                                        marketCapUsd: 1000000,
                                        volumeUsd24Hr: 0,
                                        priceUsd: 0.000035,
                                        changePercent24Hr: 0.01,
                                    }}
                                    icons={[]}
                                    showSaved={false}
                                />
                            </tr>
                        </tbody>
                    </table>
                </NextIntlClientProvider>
            </CurrencyContextProvider>
        );

        
        const spanElement = screen.getByTestId("row_price_doge");
        expect(spanElement).toHaveTextContent('$0.000035');


    });
});
