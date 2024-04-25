import { Market } from "../actions/crypto";
import SavedProvider, {
    SavedContext,
    SavedContextType,
    useSavedContext,
} from "../context/LocalContextProvider";
import Link from "next/link";

export default function CoinMarketsTable(props: { markets: string[] }) {
    return (
        <div className="border-2 rounded-md flex flex-wrap w-full">
            <div className="w-full p-2">
                Markets
            </div>
                {props.markets.map((m: string) => (
                    <div className="bg-gray-300 m-1 rounded-md">{m}</div>
                ))}
        </div>
    );
}
