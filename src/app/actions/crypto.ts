"use server";

import { ReactNode } from "react";

export type DashboardRowContent = {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    priceUsd: string;
    marketCapUsd: string;
};

export type CoinDetails = {
    id: string;
    rank: number;
    symbol: string;
    name: string;
    supply: number;
    maxSupply: number;
    marketCapUsd: number;
    volumeUsd24Hr: number;
    priceUsd: number;
    changePercent24Hr: number;
};

export type Market = {
    exchangeId: string;
    baseId: string;
    quoteId: string;
    baseSymbol: string;
    quoteSymbol: string;
    volumeUsd24Hr: number;
    priceUsd: number;
    volumePercent: number;
};

export type Exchange = {
    name: string;
    rank: number;
    share: number;
    href: string;
    volume: number;
    currencies: number;
};

export type PriceData = {
    date: string;
    price: number;
};

export type Rate = {
    id: string;
    name: string;
    symbol: string;
    rate: number;
};

const includedCurrencies = [
    "united-states-dollar",
    "euro",
    "british-pound-sterling",
    "japanese-yen",
    "swedish-krona",
    "bitcoin",
];

function getDistinctValues(strings: string[]): string[] {
    return [...new Set(strings)];
}

export async function getDashContent(page: number): Promise<CoinDetails[]> {
    if (isNaN(page)) {
        return [];
    }
    let response = await fetch(
        "https://api.coincap.io/v2/assets?offset=" + (page - 1) * 100,
        {
            next: {
                revalidate: 3600,
            },
        }
    );
    const assets = await response.json();
    return assets.data.map((asset: any) => {
        return {
            id: asset.id,
            rank: parseInt(asset.rank),
            symbol: asset.symbol,
            name: asset.name,
            supply: parseFloat(asset.supply),
            maxSupply: parseFloat(asset.maxSupply),
            marketCapUsd: parseFloat(asset.marketCapUsd),
            volumeUsd24Hr: parseFloat(asset.volumeUsd24Hr),
            priceUsd: parseFloat(asset.priceUsd),
            changePercent24Hr: parseFloat(asset.changePercent24Hr),
        };
    });
}

export async function getTempContent() {
    const iter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return iter.map((rank: number) => {
        return {
            id: rank.toString(),
            rank: rank,
            symbol: "",
            name: "",
            supply: 0,
            maxSupply: 0,
            marketCapUsd: 0,
            volumeUsd24Hr: 0,
            priceUsd: 0,
            changePercent24Hr: 0,
        };
    });
}

export async function getCoinDetails(id: string): Promise<CoinDetails> {
    let response = await fetch("https://api.coincap.io/v2/assets/" + id,
    {
        next: {
            revalidate: 3600,
        },
    });
    const asset = (await response.json()).data;
    const details: CoinDetails = {
        id: asset.id,
        rank: parseInt(asset.rank),
        symbol: asset.symbol,
        name: asset.name,
        supply: parseFloat(asset.supply),
        maxSupply: parseFloat(asset.maxSupply),
        marketCapUsd: parseFloat(asset.marketCapUsd),
        volumeUsd24Hr: parseFloat(asset.volumeUsd24Hr),
        priceUsd: parseFloat(asset.priceUsd),
        changePercent24Hr: parseFloat(asset.changePercent24Hr),
    };
    return details;
}

export async function getCoinMarkets(id: string): Promise<string[]> {
    let response = await fetch(
        `https://api.coincap.io/v2/assets/${id}/markets`,
        {
            next: {
                revalidate: 3600,
            },
        }
    );
    const assets = await response.json();
    return getDistinctValues(
        assets.data.map((asset: any) => {
            return asset.exchangeId;
        })
    );
}

export async function getMultiple(ids: string[]): Promise<CoinDetails[]> {
    let multiple: CoinDetails[] = [];
    for (let i = 0; i < ids.length; i++) {
        multiple.push(await getCoinDetails(ids[i]));
    }

    return multiple;
}

export async function getPriceHistory(
    id: string,
    duration: string
): Promise<PriceData[]> {
    let interval = "h6";
    let end = Date.now().toString();
    let start = end;
    if (duration === "1m") {
        interval = "h6";
        var d = new Date();
        d.setMonth(d.getMonth() - 1);
        d.setHours(0, 0, 0, 0);
        start = d.getTime().toString();
    } else if (duration === "3m") {
        interval = "d1";
        var d = new Date();
        d.setMonth(d.getMonth() - 3);
        d.setHours(0, 0, 0, 0);
        start = d.getTime().toString();
    } else if (duration === "1d") {
        interval = "m15";
        let d = new Date();
        let now = d.getTime();
        start = (now - 24 * 60 * 60 * 1000).toString();
    }

    var d = new Date();
    d.setMonth(d.getMonth() - 1);
    d.setHours(0, 0, 0, 0);

    let response = await fetch(
        "https://api.coincap.io/v2/assets/" +
            id +
            "/history?interval=" +
            interval +
            "&start=" +
            start +
            "&end=" +
            end,
            {
                next: {
                    revalidate: 3600,
                },
            }
    );
    const data = (await response.json()).data;

    return data.map(
        (i: any) =>
            ({ date: i.date, price: parseFloat(i.priceUsd) } as PriceData)
    );
}

export async function getExchanges(): Promise<Exchange[]> {
    let response = await fetch(`https://api.coincap.io/v2/exchanges`,
    {
        next: {
            revalidate: 3600,
        },
    });
    const ex = await response.json();

    return ex.data.map((ex: any) => {
        const share = parseFloat(ex.percentTotalVolume);
        return {
            name: ex.name,
            rank: parseInt(ex.rank),
            share: !isNaN(share) ? share : 0,
            href: ex.exchangeUrl,
            volume: parseFloat(ex.volumeUsd),
            currencies: parseInt(ex.tradingPairs),
        };
    });
}

export async function getRates(): Promise<Rate[]> {
    let response = await fetch(`https://api.coincap.io/v2/rates`,
    {
        next: {
            revalidate: 3600,
        },
    });
    const rates = await response.json();
    let filteredRates = rates.data
        .map((r: any) => {
            return {
                id: r.id,
                name: r.symbol,
                symbol: r.currencySymbol,
                rate: parseFloat(r.rateUsd),
            };
        })
        .filter((i: Rate) => includedCurrencies.includes(i.id));

    filteredRates.sort((a: Rate, b: Rate) => {
        var iA = includedCurrencies.indexOf(a.id);
        var iB = includedCurrencies.indexOf(b.id);
        return iA - iB;
    });
    return filteredRates;
}
