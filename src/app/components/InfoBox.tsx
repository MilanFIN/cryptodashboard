"use client";

import { useEffect, useRef, useState } from "react";
import { crossCircled, infoCircled } from "../icons/icons";

export function InfoBox(props: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <div
                className="cursor-pointer"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
            >
                {infoCircled}
            </div>
            {open ? (
                <div className="absolute z-10 top-3 left-3 shadow-lg bg-white border-2 w-64 rounded-b-md rounded-r-md p-1">
                    {props.children}
                </div>
            ) : null}
        </div>
    );
}
