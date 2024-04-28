"use client";

import { useEffect, useRef, useState } from "react";
import { crossCircled, infoCircled } from "../icons/icons";

export function InfoBox(props: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);



    return (
        <div className="relative">
            <div className="cursor-pointer" onClick={() => setOpen(!open)}>{infoCircled}</div>
            {open ? (
                <div
                    className="absolute top-3 left-3 bg-gray-300 w-64 rounded-b-md rounded-r-md p-1"
                    onClick={(e) => {
                        //e.stopPropagation(); // Prevent click event from bubbling up to document
                    }}
                >
                    <div className="cursor-pointer flex flex-row flex-row-reverse" onClick={() => setOpen(false)}>{crossCircled}</div>
                    {props.children}
                </div>
            ) : null}
        </div>
    );
}
