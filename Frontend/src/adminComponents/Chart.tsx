import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DonationChart: React.FC = () => {
    const [weeklyDonations, setWeeklyDonations] = useState<number[]>([]);
    const [monthlyDonations, setMonthlyDonations] = useState<number[]>([]);
    const [yearlyDonations, setYearlyDonations] = useState<number[]>([]);

    useEffect(() => {
        const fetchDonationData = async () => {
            try {
                const response = await axios.get("/api/monetary/all", {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                const donations = response.data;

                const now = new Date();
                const weeklyTotals = Array(7).fill(0); // For the last 7 weeks
                const monthlyTotals = Array(12).fill(0); // For the last 12 months
                const yearlyTotals: Record<number, number> = {}; // For yearly totals

                donations.forEach((donation: { amount: number; createdAt: string }) => {
                    const createdAt = new Date(donation.createdAt);

                    // Weekly
                    const weekIndex = Math.floor(
                        (now.getTime() - createdAt.getTime()) / (7 * 24 * 60 * 60 * 1000)
                    );
                    if (weekIndex < 7) weeklyTotals[6 - weekIndex] += donation.amount;

                    // Monthly
                    const monthIndex = (now.getFullYear() - createdAt.getFullYear()) * 12 + now.getMonth() - createdAt.getMonth();
                    if (monthIndex < 12) monthlyTotals[11 - monthIndex] += donation.amount;

                    // Yearly
                    const year = createdAt.getFullYear();
                    if (!yearlyTotals[year]) yearlyTotals[year] = 0;
                    yearlyTotals[year] += donation.amount;
                });

                setWeeklyDonations(weeklyTotals);
                setMonthlyDonations(monthlyTotals);

                // Prepare yearly data for the chart
                const sortedYears = Object.keys(yearlyTotals).sort((a, b) => +a - +b);
                setYearlyDonations(sortedYears.map(year => yearlyTotals[+year]));
            } catch (error) {
                console.error("Error fetching donation data:", error);
            }
        };

        fetchDonationData();
    }, []);

    const data = {
        labels: ['Weekly', 'Monthly', 'Yearly'],
        datasets: [
            {
                label: 'Weekly Donations',
                data: weeklyDonations,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
            },
            {
                label: 'Monthly Donations',
                data: monthlyDonations,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2,
            },
            {
                label: 'Yearly Donations',
                data: yearlyDonations,
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in">
            <Line data={data} />
        </div>
    );
};

export default DonationChart;
