
"use client"
import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/UseLocalStorage";

export type SavedContextType = {
    saved: string[];
    addSaved: (f: string) => void;
    removeSaved: (id: string) => void;
    clearSaved: () => void;
};

export const SavedContext = React.createContext<SavedContextType | null>(null);
export const useSavedContext = () => useContext(SavedContext);

const SavedProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [saved, setSaved] = useLocalStorage("saved", new Array<string>());
    //const [saved, setSaved] = useState<string[]>([]);

    function addSaved(f: string) {
        if (!saved.includes(f)) {
            setSaved((saved) => [...saved, f]);
        }
    }

    function removeSaved(f: string) {
        if (saved.includes(f)) {
            setSaved((saved) => saved.filter(i => i !== f))
        }
    }

    function clearSaved() {
        setSaved([]);
    }

    return (
        <SavedContext.Provider
            value={{ saved, addSaved, removeSaved, clearSaved }}
        >
            {children}
        </SavedContext.Provider>
    );
};

export default SavedProvider;
