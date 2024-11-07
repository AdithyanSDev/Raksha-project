import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale, // Register the CategoryScale
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the necessary chart components
ChartJS.register(
    CategoryScale, // Important to register the "category" scale
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const RegistrationChart: React.FC = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Registrations',
                data: [200, 400, 600, 700, 800, 600, 400],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <Line data={data} />
        </div>
    );
};

export default RegistrationChart;
