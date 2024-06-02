"use client";
//import { cookies } from 'next/headers';
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { getBookmarked, saveBookmarked } from "../actions/bookmarks";

type SetValue<T> = Dispatch<SetStateAction<T>>;

export default function useCookieStorage(
    fallbackValue: string[]
): [string[], SetValue<string[]>] {
    const [value, setValue] = useState<string[]>([]);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (value.length == 0) {
                const stored = await getBookmarked();
                if (!stored) {
                    return;
                }
                setValue(stored ? stored : fallbackValue);
            }
            const stored = await getBookmarked();
            if (!stored) {
                return;
            }
            setValue(stored ? stored : fallbackValue);
            setTrigger(true);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!trigger) {
            return;
        }
        if (!value) {
            return;
        }
        //localStorage.setItem(key, JSON.stringify(value))
        //cookies().set("bookmarked", JSON.stringify(value))
        saveBookmarked(value);
    }, [value]);

    return [value, setValue];
}
