import {
    SavedContextType,
    useSavedContext,
} from "../context/LocalContextProvider";
import { useContext, useEffect } from "react";
import { cookies } from "next/headers";

export function SavedField(props: { id: string }) {
    const { saved, addSaved, removeSaved } =
        useSavedContext() as SavedContextType;


    if (saved.some((i) => i == props.id)) {
        return <div className="cursor-pointer" onClick={() => removeSaved(props.id)}>saved</div>;
    } else {
        return <div className="cursor-pointer" onClick={() => addSaved(props.id)}>not saved</div>;
    }
}
