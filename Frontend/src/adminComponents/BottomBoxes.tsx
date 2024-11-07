// components/BottomBoxes.tsx
import React from 'react';

const BottomBoxes: React.FC = () => {
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-300 p-6 rounded-lg text-center">
                <h2 className="text-xl font-bold">Recent Donations</h2>
            </div>
            <div className="bg-green-300 p-6 rounded-lg text-center">
                <h2 className="text-xl font-bold">Recent Requests</h2>
            </div>
            <div className="bg-green-300 p-6 rounded-lg text-center">
                <h2 className="text-xl font-bold">Recent Registrations</h2>
            </div>
        </div>
    );
};

export default BottomBoxes;
