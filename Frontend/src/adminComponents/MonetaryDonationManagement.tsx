// components/MonetaryDonationManagement.tsx
import React, { useEffect, useState } from "react";
import { fetchMonetaryDonations } from "../services/donationService";

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
    <div>
      <h2 className="text-2xl font-bold mb-5">Monetary Donations</h2>
      <div className="space-y-4">
        {monetaryDonations.map((donation: any) => (
          <div key={donation.id} className="p-4 bg-gray-200 rounded-lg">
            <p><strong>Donor:</strong> {donation.donorName}</p>
            <p><strong>Amount:</strong> {donation.amount}</p>
            <p><strong>Status:</strong> {donation.status}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonetaryDonationManagement;
