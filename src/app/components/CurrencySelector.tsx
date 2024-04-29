import { useEffect, useRef, useState } from "react";

export default function CurrencySelector(props: {
    selected: string;
    currencies: string[];
    setCurrency: (i: number) => void;
}) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null); // Create a ref for the wrapper div

    const handleClickOutside = (event: { target: any }) => {
        // Check if the click is outside the ref element
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setOpen(false); // Close the dropdown
        }
    };

    useEffect(() => {
        // Add click event listener to the document
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Cleanup the event listener on component unmount
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-32" ref={wrapperRef}>
            <div onClick={() => setOpen(!open)} className="cursor-pointer w-full">Currency: {props.selected}</div>
            {open && (
                <div className="absolute z-10 bg-white shadow-md mt-1 w-32  rounded-md border-2 shadow-lg p-2">
                    {props.currencies.map((c, ind) => (
                        <div
                            className="hover:bg-gray-300 w-full cursor-pointer"
                            key={"CURR_" + c}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent click event from bubbling up to document
                                props.setCurrency(ind);
                                setOpen(false); // Optionally close the dropdown after selection
                            }}
                        >
                            {c}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
