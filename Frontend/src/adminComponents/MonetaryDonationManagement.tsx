import React, { useEffect, useState } from "react";
import { fetchMonetaryDonations } from "../services/donationService"; // Adjust the import based on your actual service file
import Sidebar from "./Sidebar";

const MonetaryDonationManagement: React.FC = () => {
  const [monetaryDonations, setMonetaryDonations] = useState([]);

  useEffect(() => {
    const loadMonetaryDonations = async () => {
      const donations = await fetchMonetaryDonations();
      setMonetaryDonations(donations);
    };
    loadMonetaryDonations();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-5">Monetary Donations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">Donor</th>
                <th className="px-4 py-2 border-b text-left">Payment Method</th>
                <th className="px-4 py-2 border-b text-left">Amount</th>
                <th className="px-4 py-2 border-b text-left">Cover Fees</th>
                <th className="px-4 py-2 border-b text-left">Date Donated</th>
              </tr>
            </thead>
            <tbody>
              {monetaryDonations.map((donation: any, index: number) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{donation.donorName}</td>
                  <td className="px-4 py-2">
                    {donation.paymentMethod.replace("_", " ").toUpperCase()}
                  </td>
                  <td className="px-4 py-2">${donation.amount.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    {donation.coverFees > 0 ? `$${donation.coverFees.toFixed(2)}` : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MonetaryDonationManagement;
