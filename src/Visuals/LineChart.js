import {Line} from 'react-chartjs-2';
import { Chart, CategoryScale } from 'chart.js';


export default function LineChart({data, labels}) {

    Chart.register(CategoryScale);

    
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Portfolio Value',
                data: data,
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return <Line data={chartData}/>;
}