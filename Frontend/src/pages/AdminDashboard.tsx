import React from "react";
import RegistrationChart from "../adminComponents/Chart";
import Sidebar from "../adminComponents/Sidebar";
import StatsBoxes from "../adminComponents/StatsBoxes";

const AdminDashboard: React.FC = () => {
  return (
    <div className="h-screen flex flex-col md:flex-row bg-green-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard */}
      <div className="flex-1 p-5 space-y-8 animate-fade-in overflow-y-auto">
        {/* Top Boxes */}
        <StatsBoxes />

        {/* Graph Section */}
        <RegistrationChart />
      </div>
    </div>
  );
};

export default AdminDashboard;
