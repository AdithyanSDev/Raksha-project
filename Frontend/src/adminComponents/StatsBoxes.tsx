// components/StatsBoxes.tsx
import React from 'react';

const StatsBoxes: React.FC = () => {
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-300 p-6 text-center rounded-lg">
                <h2 className="text-xl font-bold">Total Users</h2>
                <p className="text-2xl">1200</p>
            </div>
            <div className="bg-green-300 p-6 text-center rounded-lg">
                <h2 className="text-xl font-bold">Total Resources</h2>
                <p className="text-2xl">450</p>
            </div>
            <div className="bg-green-300 p-6 text-center rounded-lg">
                <h2 className="text-xl font-bold">Total Donations</h2>
                <p className="text-2xl">$5000</p>
            </div>
        </div>
    );
};

export default StatsBoxes;
