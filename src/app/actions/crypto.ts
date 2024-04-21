"use server";

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

export type PriceData = {
    date: string;
    price: number;
};

export async function getDashContent(page: number) {
    if (isNaN(page)) {
        return [];
    }
    let response = await fetch(
        "https://api.coincap.io/v2/assets?offset=" + (page - 1) * 100
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

export async function getCoinDetails(id: string): Promise<CoinDetails> {
    let response = await fetch("https://api.coincap.io/v2/assets/" + id);
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
            end
    );
    const data = (await response.json()).data;

    return data.map(
        (i: any) =>
            ({ date: i.date, price: parseFloat(i.priceUsd) } as PriceData)
    );
}
