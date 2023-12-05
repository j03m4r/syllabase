"use client";

import { GradeCategory } from "@/types";
import { Chart as ChartJs, ArcElement, Legend, Tooltip } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';

ChartJs.register(ArcElement, Legend, ChartDataLabels, Tooltip);

interface PieChartProps {
    gradeCategories: [string, number][];
};

const PieChart: React.FC<PieChartProps> = ({
    gradeCategories
}) => {
    const labels = gradeCategories.map((gradeCategory) => gradeCategory[0]);
    const percentages = gradeCategories.map((gradeCategory) => gradeCategory[1]);
    const data = {
        labels: labels,
        datasets: [{
            data: percentages,
            backgroundColor: [
                '#CFBDFF',
                '#E5DBFF',
                '#99edc3',
                '#9ADFED',
                '#ACED9A',
                '#E4BDFF',
                '#FFBDE0',
                '#BDEAFF',
                '#291E42',
                '#371F76'
            ]
        }]
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                mode: 'index',
                intersect: true
            },
            hover: {
                mode: 'index',
                intersect: false
            },
            datalabels: {
                // @ts-ignore
                formatter: function (value, context) {
                    return context.chart.data.labels[context.dataIndex];
                },
                anchor: 'center',
                align: 'end',
                offset: 40
            },
        }
    }

    return (
        // @ts-ignore
        <Pie data={data} options={options} plugins={[ChartDataLabels]}/>
    );
}

export default PieChart;