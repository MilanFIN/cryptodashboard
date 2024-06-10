import {
    SavedContextType,
    useSavedContext,
} from "../context/BookmarkContextProvider";
import { useContext, useEffect } from "react";
import { cookies } from "next/headers";
import {heartEmpty, heartFilled} from "@/app/icons/icons"

export function SavedField(props: { id: string }) {
    const { saved, addSaved, removeSaved } =
        useSavedContext() as SavedContextType;


    if (saved.some((i) => i == props.id)) {
        return <div className="cursor-pointer mr-2 my-auto" id={"remove_bookmark_"+props.id} onClick={() => removeSaved(props.id)}>{heartFilled}</div>;
    } else {
        return <div className="cursor-pointer mr-2 my-auto" id={"add_bookmark_"+props.id} onClick={() => addSaved(props.id)}>{heartEmpty}</div>;
    }
}
