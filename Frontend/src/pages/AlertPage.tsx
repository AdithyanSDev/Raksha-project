// src/components/AlertManagement.tsx
import React, { useEffect, useState } from "react";
import { fetchAlerts } from "../services/alertService"; // API call to fetch alerts
import AlertForm from "../adminComponents/CreateAlertForm";
import Sidebar from "../adminComponents/Sidebar";

interface Alert {
  id: string;
  title: string;
  description: string;
  alertType: string;
  severity: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const AlertManagement: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const response = await fetchAlerts();
        setAlerts(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Failed to load alerts:", error);
        setAlerts([]);
      }
    };

    loadAlerts();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-4/5 p-8">
        <h2 className="text-3xl font-bold mb-6">Alert Management</h2>

        {!showForm ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">Alerts</h3>
              <button
                onClick={() => setShowForm(true)}
                className="bg-green-500 text-white p-2 rounded-lg"
              >
                Create Alert
              </button>
            </div>
            {alerts.length === 0 ? (
              <div className="text-center text-xl mt-10">No alerts available</div>
            ) : (
              <table className="w-full border border-gray-300">
                <thead>
                  <tr className="bg-green-200">
                    <th className="border p-2">Title</th>
                    <th className="border p-2">Description</th>
                    <th className="border p-2">Type</th>
                    <th className="border p-2">Severity</th>
                    <th className="border p-2">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map((alert) => (
                    <tr key={alert.id} className="hover:bg-gray-100">
                      <td className="border p-2">{alert.title}</td>
                      <td className="border p-2">{alert.description}</td>
                      <td className="border p-2">{alert.alertType}</td>
                      <td className="border p-2">{alert.severity}</td>
                      <td className="border p-2">
                        {alert.location.latitude}, {alert.location.longitude}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        ) : (
          <AlertForm onAlertCreated={() => setShowForm(false)} />
        )}
      </div>
    </div>
  );
};

export default AlertManagement;
