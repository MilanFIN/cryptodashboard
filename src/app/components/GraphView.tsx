"use client"
import { useEffect, useState } from "react";
import { PriceData, getPriceHistory } from "../actions/crypto";
import Linechart from "./Linechart";

export default function GraphView(props: {id: string,  initial: PriceData[] }) {
    const [data, setData] = useState<PriceData[]>([]);

    useEffect(() => {
        setData(props.initial);
    }, props.initial);

	function updateSpan(span: string) {
		const data = getPriceHistory(props.id, span);
		data.then(d => {
			setData(d);
		})
	}

    return (
        <div className="w-full">
            <span>Resolution</span>
            <button className={`bg-gray-200 hover:bg-gray-300 w-10 rounded-sm mr-2`} onClick={() => updateSpan("1d")}>1d</button>
            <button className={`bg-gray-200 hover:bg-gray-300 w-10 rounded-sm mr-2`} onClick={() => updateSpan("1m")}>1m</button>
            <button className={`bg-gray-200 hover:bg-gray-300 w-10 rounded-sm mr-2`} onClick={() => updateSpan("3m")}>3m</button>

            <Linechart data={data} />
        </div>
    );
}
