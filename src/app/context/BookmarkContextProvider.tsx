
"use client"
import React, { useContext, useState } from "react";
import useCookieStorage from "../hooks/UseCookieStorage";

export type SavedContextType = {
    saved: string[];
    addSaved: (f: string) => void;
    removeSaved: (id: string) => void;
    clearSaved: () => void;
};

export const SavedContext = React.createContext<SavedContextType | null>(null);
export const useSavedContext = () => useContext(SavedContext);

const BookmarkContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [saved, setSaved] = useCookieStorage(new Array<string>());

    function addSaved(f: string) {
        if (!saved.includes(f)) {
            setSaved((saved: string[]) => [...saved, f]);
        }
    }

    function removeSaved(f: string) {
        if (saved.includes(f)) {
            setSaved((saved:string[]) => saved.filter((i: string) => i !== f))
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

export default BookmarkContextProvider;
