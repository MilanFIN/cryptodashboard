import {
    SavedContextType,
    useSavedContext,
} from "../context/LocalContextProvider";
import { useContext, useEffect } from "react";
import { cookies } from "next/headers";
import {heartEmpty, heartFilled} from "@/app/icons/heart"

export function SavedField(props: { id: string }) {
    const { saved, addSaved, removeSaved } =
        useSavedContext() as SavedContextType;

    if (saved.some((i) => i == props.id)) {
        return <div className="cursor-pointer mr-2 my-auto" onClick={() => removeSaved(props.id)}>{heartFilled}</div>;
    } else {
        return <div className="cursor-pointer mr-2 my-auto" onClick={() => addSaved(props.id)}>{heartEmpty}</div>;
    }
}
