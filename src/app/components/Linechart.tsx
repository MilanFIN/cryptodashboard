"use client";

//import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale } from "chart.js";
//import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import { PriceData } from "../actions/crypto";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { CurrencyContextType, useCurrencyContext } from "../context/CurrencyContextProvider";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function zeroPad(value: number) {
    let strValue = value.toString();
	if (strValue.length < 2) {
		strValue = "0" + strValue;
	}
	return strValue;

}

export default function Linechart(props: { data: PriceData[] }) {
    if (props.data.length == 0) {
        return null;
    }


    const { sanitizeCurrency, currencySymbol } =
    useCurrencyContext() as CurrencyContextType;


    const green =
        props.data[props.data.length - 1].price >= props.data[0].price;



    const chartData = {
        labels: props.data.map((i) => i.date),
        datasets: [
            {
                label: "Price Chart (USD)",
                backgroundColor: green ? "#00ff00" : "#ff0000",
                borderColor: green ? "#00ff00" : "#ff0000",
                fill: {
                    target: "origin",
                    above: green ? "#00ff0060" : "#ff000060",
                },
                data: props.data.map((i) => i.price),
            },
        ],
    };

    return (
        <Line
            data={chartData}
            options={{
                interaction: {
                    mode: "nearest",
                    axis: "x",
                    intersect: false,
                },
                animation: false,
                elements: {
                    point: {
                        radius: 0,
                        backgroundColor: "black",
                    },
                },
                plugins: {
                    title: {
                        display: false,
                        text: "Price history (USD)",
                    },
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        displayColors: false,
                        backgroundColor: "#dddddd",
                        titleColor: "black",
                        bodyColor: "black",
                        callbacks: {
                            label: function (context) {
                                let value = sanitizeCurrency(context.parsed.y).toFixed(2);

                                return currencySymbol + " " + value;
                            },
                            title: function (context) {
                                let title = context[0].label;
                                let date = new Date(title);
                                return (
                                    date.getDate() +
                                    "." +
                                    (date.getMonth() + 1) +
                                    "." +
                                    date.getFullYear() +
                                    " " +
                                    zeroPad(date.getHours()) +
                                    ":" +
                                    zeroPad(date.getMinutes())
                                );
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        offset: false,
                        ticks: {
                            callback: function (value: any, index, ticks: any) {
                                let date = new Date(chartData.labels[index]);
                                return (
                                    date.getDate() +
                                    "." +
                                    (date.getMonth() + 1) +
                                    "." +
                                    date.getFullYear()
                                );
                            },
                        },
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        ticks: {
                            callback: function (value: any, index, ticks) {
                                return sanitizeCurrency(value).toLocaleString();
                            },
                        },
                        title: {
                            display: true,
                            text: currencySymbol,
                        },
                    },
                },
            }}
        />
    );
}
