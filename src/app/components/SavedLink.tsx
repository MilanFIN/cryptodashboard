import { Suspense, useContext, useEffect } from "react";
import SavedProvider, {
    SavedContext,
    SavedContextType,
    useSavedContext,
} from "../context/BookmarkContextProvider";
import {Link} from "@/navigation";

export default function SavedLink(props: { children: React.ReactNode}) {
    const { saved } =
        useSavedContext() as SavedContextType;

    return <Link href={"/bookmarked/" /*+ saved.join(",")*/}>{props.children}</Link>;
}
