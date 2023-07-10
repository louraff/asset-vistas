// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale } from 'chart.js';
// import 'chartjs-adapter-moment';
// import { useEffect, useRef, useState } from 'react';
// import { LinearScale, PointElement, Tooltip, Legend, TimeScale } from "chart.js";


// export default function LineChart({ data, labels }) {
//     const [chartInstance, setChartInstance] = useState(null);
//     const chartRef = useRef(null);

//     ChartJS.register(LinearScale, PointElement, Tooltip, Legend, TimeScale);

//     ChartJS.register({
//         id: 'time',
//         defaults: {},
//         descriptors: {},
//         scales: {
//             time: {
//                 type: 'time',
//                 options: {}
//             }
//         }
//     });

//     useEffect(() => {
//         // If a chart instance already exists, destroy it
//         if (chartInstance) {
//             chartInstance.destroy();
//         }

//         const chartData = {
//             labels: labels.map(date => new Date(date)),
//             datasets: [
//                 {
//                     label: 'Portfolio Value',
//                     data: data,
//                     fill: false,
//                     backgroundColor: 'rgb(75, 192, 192)',
//                     borderColor: 'rgba(75, 192, 192, 0.2)',
//                 },
//             ],
//         };

//         const options = {
//             scales: {
//                 x: {
//                     type: 'time',
//                     time: {
//                         unit: 'day',
//                     },
//                 },
//             },
//         };

//         const newChartInstance = new ChartJS(chartRef.current.getContext('2d'), {
//             type: 'line',
//             data: chartData,
//             options: options
//         });

//         setChartInstance(newChartInstance);

//     }, [data, labels]);

//     return <canvas ref={chartRef} />;
// }
