// components/MaterialDonationManagement.tsx
import React, { useEffect, useState } from 'react';
import {
  fetchApprovedMaterialDonations,
  fetchPendingMaterialDonations,
  updateDonationStatus,
} from '../services/donationService';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';
import CancelModal from './CancelModal';

const MaterialDonationManagement: React.FC = () => {
  const [materialDonations, setMaterialDonations] = useState<any[]>([]);
  const [showPending, setShowPending] = useState(false);
  const [pendingDonations, setPendingDonations] = useState<any[]>([]);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedDonationId, setSelectedDonationId] = useState<string | null>(null);

  useEffect(() => {
    const loadApprovedDonations = async () => {
      const donations = await fetchApprovedMaterialDonations();
      setMaterialDonations(donations);
    };
    loadApprovedDonations();
  }, []);

  const loadPendingDonations = async () => {
    const donations = await fetchPendingMaterialDonations();
    setPendingDonations(donations);
  };

  const handleApprove = async (id: string) => {
    try {
      await updateDonationStatus(id, 'approved');
      toast.success('Donation approved!');
      loadPendingDonations();
    } catch (error) {
      toast.error('Error approving donation!');
    }
  };

  const handleReject = async (id: string) => {
    setSelectedDonationId(id);
    setIsCancelModalOpen(true);
  };

  const handleCancelSubmission = async (reason: string) => {
    if (!selectedDonationId) return;

    try {
      await updateDonationStatus(selectedDonationId, 'rejected', reason);
      toast.error('Donation rejected!');
      setIsCancelModalOpen(false);
      loadPendingDonations();
    } catch (error) {
      toast.error('Error rejecting donation!');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-5">Material Donations</h2>
        <button
          onClick={() => {
            setShowPending(!showPending);
            loadPendingDonations();
          }}
          className="mb-4 p-2 bg-blue-500 text-white rounded"
        >
          {showPending ? 'Back to Approved Donations' : 'Requests'}
        </button>

        {showPending ? (
          <div>
            {pendingDonations.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b">Donor</th>
                    <th className="px-4 py-2 border-b">Item</th>
                    <th className="px-4 py-2 border-b">Quantity</th>
                    <th className="px-4 py-2 border-b">Created At</th>
                    <th className="px-4 py-2 border-b">Images</th>
                    <th className="px-4 py-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingDonations.map((donation: any) => (
                    <tr key={donation._id} className="border-b hover:bg-gray-100">
                      <td className="px-4 py-2">{donation.donorName}</td>
                      <td className="px-4 py-2">{donation.item}</td>
                      <td className="px-4 py-2">{donation.quantity}</td>
                      <td className="px-4 py-2">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">
                        {donation.images?.map((image: string, index: number) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Donation image ${index}`}
                            className="w-10 h-10 object-cover mr-2"
                          />
                        ))}
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => handleApprove(donation._id)}
                          className="p-1 bg-green-500 text-white rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(donation._id)}
                          className="p-1 bg-red-500 text-white rounded"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center">No pending donations</p>
            )}
          </div>
        ) : (
          <div>
            {materialDonations.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b">Donor</th>
                    <th className="px-4 py-2 border-b">Item</th>
                    <th className="px-4 py-2 border-b">Quantity</th>
                    <th className="px-4 py-2 border-b">Created At</th>
                    <th className="px-4 py-2 border-b">Images</th>
                  </tr>
                </thead>
                <tbody>
                  {materialDonations.map((donation: any) => (
                    <tr key={donation._id} className="border-b hover:bg-gray-100">
                      <td className="px-4 py-2">{donation.donorName}</td>
                      <td className="px-4 py-2">{donation.item}</td>
                      <td className="px-4 py-2">{donation.quantity}</td>
                      <td className="px-4 py-2">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">
                        {donation.images?.map((image: string, index: number) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Donation image ${index}`}
                            className="w-10 h-10 object-cover mr-2"
                          />
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center">No approved donations</p>
            )}
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      <CancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onSubmit={handleCancelSubmission}
      />
    </div>
  );
};

export default MaterialDonationManagement;
