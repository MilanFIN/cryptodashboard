import { Suspense, useContext, useEffect } from "react";
import SavedProvider, {
    SavedContext,
    SavedContextType,
    useSavedContext,
} from "../context/LocalContextProvider";
import Link from "next/link";

export default function SavedLink(props: {}) {
    const { saved, addSaved, removeSaved, clearSaved } =
        useSavedContext() as SavedContextType;

    useEffect(() => {
        console.log(saved);
    }, [saved]);

    return <Link href={"/saved/" + saved.join(",")}>Saved</Link>;
}
