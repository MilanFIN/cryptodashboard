import { Suspense, useContext, useEffect } from "react";
import SavedProvider, {
    SavedContext,
    SavedContextType,
    useSavedContext,
} from "../context/LocalContextProvider";
import Link from "next/link";

export default function SavedLink(props: { children: React.ReactNode }) {
    const { saved } =
        useSavedContext() as SavedContextType;

    return <Link href={"/favorites/" + saved.join(",")}>{props.children}</Link>;
}
