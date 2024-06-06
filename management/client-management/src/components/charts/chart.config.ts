import { ApexOptions } from "apexcharts";

export const TotalRevenueSeries = [
    {
        name: "",
        data: [183, 124, 115, 85, 143, 143, 96, 10, 1, 1, 1, 1],
    },
];

const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const TotalRevenueOptions: ApexOptions = {
    chart: {
        type: "bar",
        toolbar: {
            show: false,
        },
    },
    colors: ["#475BE8", "#CFC8FF"],
    plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: false,
            columnWidth: "55%",
        },
    },
    dataLabels: {
        enabled: false,
    },
    grid: {
        show: false,
    },
    stroke: {
        colors: ["transparent"],
        width: 4,
    },
    xaxis: {
        categories: month.map((month) => month),
        labels: {
            style: {
                colors: month.map((_, index) =>
                    index === new Date().getMonth() ? "#FF5733" : "#000"
                ), // Highlight current month label
            },
        },
    },
    yaxis: {
        title: {
            text: "$ (thousands)",
        },
    },
    fill: {
        opacity: 1,
        colors: month.map((_, index) =>
            index === new Date().getMonth() ? "#FF5733" : "#475ae8"
        ),
    },
    legend: {
        position: "top",
        horizontalAlign: "right",
    },
    tooltip: {
        y: {
            formatter: function (val: number) {
                return `$ ${val} thousands`;
            },
        },
        enabled: true,
    },
};
