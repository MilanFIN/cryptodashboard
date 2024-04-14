"use client";
import Link from "next/link";

export default function PageNavigation(props: { page: number }) {
    const next = props.page + 1;
    const prev = props.page - 1;
    return (
        <>
            <Link
                className={`${
                    prev <= 0 ? "text-gray-500 disabled" : "text-black"
                }`}
                href={"/" + prev}
                onClick={(e) => {
                    if (prev <= 0) e.preventDefault();
                }}
            >
                Previous
            </Link>

            <Link className="text-black" href={"/" + next}>
                Next
            </Link>
        </>
    );
}
