// components/MaterialDonationManagement.tsx
import React, { useEffect, useState } from "react";
import { fetchMaterialDonations } from "../services/donationService";

const MaterialDonationManagement: React.FC = () => {
  const [materialDonations, setMaterialDonations] = useState([]);

  useEffect(() => {
    const loadMaterialDonations = async () => {
      const donations = await fetchMaterialDonations();
      setMaterialDonations(donations);
    };
    loadMaterialDonations();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Material Donations</h2>
      <div className="space-y-4">
        {materialDonations.map((donation: any) => (
          <div key={donation.id} className="p-4 bg-gray-200 rounded-lg">
            <p><strong>Donor:</strong> {donation.donorName}</p>
            <p><strong>Items:</strong> {donation.items.join(", ")}</p>
            <p><strong>Status:</strong> {donation.status}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialDonationManagement;
