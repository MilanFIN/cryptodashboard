import Link from "next/link";
import { CoinDetails, DashboardRowContent } from "../actions/crypto";
import { SavedField } from "./Savedfield";
import { IconSource } from "../actions/images";

export async function DashboardRow(props: {
    content: CoinDetails;
    icons: IconSource[];
}) {
    let img = "";
    if (
        props.icons.some((i) => i.symbol === props.content.symbol.toLowerCase())
    ) {
        img = props.icons.filter(
            (i) => i.symbol === props.content.symbol.toLowerCase()
        )[0].content;
    }
    else {
        img = props.icons.filter(
            (i) => i.symbol === "generic"
        )[0].content;
    }
    return (
        <>
            <td className="py-3 px-2">
                <Link href={"/coin/" + props.content.id}>
                    {props.content.rank}
                </Link>
            </td>
            <td className="py-3 px-2">
                <Link
                    href={"/coin/" + props.content.id}
                    className="flex flex-wrap"
                >

                        <img
                            src={`data:image/svg+xml;base64,${btoa(img)}`}
                            width="25"
                            height="25"
                            className="mr-2"
                        ></img>
                    <span className="font-bold mr-2">
                        {props.content.name}{" "}
                    </span>
                    {props.content.symbol}
                </Link>
            </td>
            <td className="py-3 px-2">
                <Link href={"/coin/" + props.content.id}>
                    ${props.content.priceUsd.toFixed(2)}
                </Link>
            </td>
            <td className="py-3 px-2">
                <Link href={"/coin/" + props.content.id}>
                    ${props.content.marketCapUsd.toFixed(0)}
                </Link>
            </td>
            <td
                className={`${
                    props.content.changePercent24Hr >= 0
                        ? "text-green-500"
                        : "text-red-500"
                } py-3 px-2`}
            >
                <Link href={"/coin/" + props.content.id}>
                    {Math.abs(props.content.changePercent24Hr).toFixed(2) + "%"}
                </Link>
            </td>
            <td className="py-3 px-2">
                <SavedField id={props.content.id} />
            </td>
        </>
    );
}

/*
            

*/
