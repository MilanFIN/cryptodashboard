"use client"
import { useEffect, useState } from "react";
import { PriceData, getPriceHistory } from "../actions/crypto";
import Linechart from "./Linechart";

export default function GraphView(props: {id: string,  initial: PriceData[] }) {
    const [data, setData] = useState<PriceData[]>([]);
    const [s, setS] = useState("1m");

    useEffect(() => {
        setData(props.initial);
    }, props.initial);

	function updateSpan(span: string) {
        setS(span);
		const data = getPriceHistory(props.id, span);
		data.then(d => {
			setData(d);
		})
	}

    return (
        <div className="w-full max-w-[800px]">
            <div className="w-full flex justify-end">
            <span>Resolution</span>
            <button className={`${s == "1d" ? "bg-gray-400" : "bg-gray-200"} hover:bg-gray-300 w-10 rounded-sm mr-2`} onClick={() => updateSpan("1d")}>1d</button>
            <button className={`${s == "1m" ? "bg-gray-400" : "bg-gray-200"} hover:bg-gray-300 w-10 rounded-sm mr-2`} onClick={() => updateSpan("1m")}>1m</button>
            <button className={`${s == "3m" ? "bg-gray-400" : "bg-gray-200"} hover:bg-gray-300 w-10 rounded-sm mr-2`} onClick={() => updateSpan("3m")}>3m</button>

            </div>

            <Linechart data={data} />
        </div>
    );
}
