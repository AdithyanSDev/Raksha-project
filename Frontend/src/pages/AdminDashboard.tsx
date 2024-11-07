// pages/AdminDashboard.tsx
import React from 'react';
import BottomBoxes from '../adminComponents/BottomBoxes';
import RegistrationChart from '../adminComponents/Chart';
import Sidebar from '../adminComponents/Sidebar';
import StatsBoxes from '../adminComponents/StatsBoxes';


const AdminDashboard: React.FC = () => {
    return (        
        <div className="h-screen flex bg-green-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Dashboard */}
            <div className="w-4/5 p-5 space-y-8">
                {/* Top Boxes */}
                <StatsBoxes />

                {/* Graph Section */}
                <RegistrationChart />

                {/* Bottom Boxes */}
                <BottomBoxes />
            </div>
        </div>
    );
};

export default AdminDashboard;
