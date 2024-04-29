import { Market } from "../actions/crypto";
import SavedProvider, {
    SavedContext,
    SavedContextType,
    useSavedContext,
} from "../context/LocalContextProvider";
import Link from "next/link";
import { InfoBox } from "./InfoBox";

export default function CoinMarketsTable(props: { markets: string[] }) {
    return (
        <div className="border-2 rounded-md flex flex-wrap w-full">
            <div className="w-full p-2 flex flex-wrap">
                Markets <InfoBox><span>Exchanges where this coin is listed</span></InfoBox>
            </div>
                {props.markets.map((m: string) => (
                    <div className="bg-gray-300 m-1 rounded-md px-1">{m}</div>
                ))}
        </div>
    );
}
