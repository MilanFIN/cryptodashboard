"use client"
import { useEffect, useState, Dispatch, SetStateAction } from 'react'

type SetValue<T> = Dispatch<SetStateAction<T>>

export default function useLocalStorage(
    key: string,
    fallbackValue: string[]
): [string[], SetValue<string[]>] {
    const [value, setValue] = useState<string[]>([])
    const [trigger,setTrigger] = useState(false);
        
    
    useEffect(() => {
        
        if (value.length == 0) {
            const stored = localStorage.getItem(key)
            if (!stored) {
                return
            }
            setValue(stored ? JSON.parse(stored) : fallbackValue)
            }
        const stored = localStorage.getItem(key)
        if (!stored) {
            return
        }
        setValue(stored ? JSON.parse(stored) : fallbackValue)
        setTrigger(true);

        
    }, [])
    
    useEffect(() => {
        if (!trigger) {
            return;
        }
        if (!value) {
            return
        }
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    

    return [value, setValue]
}