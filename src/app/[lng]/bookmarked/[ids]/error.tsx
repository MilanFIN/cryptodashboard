"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="xl:w-[800px] w-full mt-2">
            <h2 className="text-xl mb-2">An error occurred</h2>
            <div>
                An error occurred when fetching one or more of the bookmarked
                coins.
            </div>
        </div>
    );
}
