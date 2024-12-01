import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../services/UserService';
import axios from 'axios';

const StatsBoxes: React.FC = () => {
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [totalResources, setTotalResources] = useState<number>(0);
    const [totalDonations, setTotalDonations] = useState<number>(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch users
                const users = await fetchUsers();
                setTotalUsers(users.length);

                // Fetch resources
                const resourcesResponse = await axios.get("/api/resources/resources");
                setTotalResources(resourcesResponse.data.length);

                // Fetch monetary donations
                const donationsResponse = await axios.get("/api/monetary/all", {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                // Calculate total donations
                const total = donationsResponse.data.reduce((acc: number, donation: { amount: number }) => acc + donation.amount, 0);
                setTotalDonations(total);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="grid grid-cols-3 gap-4 animate-fade-in">
            <div className="bg-green-300 p-6 text-center rounded-lg shadow-md">
                <h2 className="text-xl font-bold">Total Users</h2>
                <p className="text-2xl">{totalUsers}</p>
            </div>
            <div className="bg-green-300 p-6 text-center rounded-lg shadow-md">
                <h2 className="text-xl font-bold">Total Resources</h2>
                <p className="text-2xl">{totalResources}</p>
            </div>
            <div className="bg-green-300 p-6 text-center rounded-lg shadow-md">
                <h2 className="text-xl font-bold">Total Donations</h2>
                <p className="text-2xl">${totalDonations}</p>
            </div>
        </div>
    );
};

export default StatsBoxes;
