"use client";
import Link from "next/link";

export default function PageNavigation(props: { page: number }) {
    const next = props.page + 1;
    const prev = props.page - 1;
    return (
        <div className="mt-4">
            <Link
                className={`${
                    prev <= 0 ? "text-gray-500 disabled" : "text-blue-800"
                } bg-gray-300 rounded-md px-2 py-1 font-bold`}
                href={"/" + prev}
                onClick={(e) => {
                    if (prev <= 0) e.preventDefault();
                }}
            >
                Previous
            </Link>

            <Link className="text-blue-800 bg-gray-300 rounded-md px-2 py-1 ml-1 font-bold" href={"/" + next}>
                Next
            </Link>
        </div>
    );
}
