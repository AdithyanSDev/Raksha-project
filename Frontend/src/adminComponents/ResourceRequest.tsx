import React, { useState, useEffect } from "react";
import Sidebar from "../adminComponents/Sidebar";
import {
  fetchRequestsByStatus,
  approveRequest,
  rejectRequest,
} from "../services/resourceService";
import { toast } from "react-toastify";

interface ResourceRequest {
  _id: string;
  userId: string;
  resourceType: string;
  quantity: number;
  description: string;
  location: string;
  address: string;
  contactInfo: string;
  urgencyLevel: string;
  disasterType: string;
  numberOfPeopleAffected: number;
  rejectionReason?: string;
}

const ResourceRequests: React.FC = () => {
  const [requests, setRequests] = useState<ResourceRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [rejectModal, setRejectModal] = useState<{
    show: boolean;
    requestId: string | null;
  }>({ show: false, requestId: null });
  const [rejectionReason, setRejectionReason] = useState<string>("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRequestsByStatus(statusFilter, token || "").then(setRequests);
  }, [statusFilter]);

  const handleApprove = async (id: string) => {
    try {
      await approveRequest(id, token || "");
      toast.success("Request approved successfully!");
  
      // Update the local state by removing the approved request
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== id)
      );
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = (id: string) => {
    setRejectModal({ show: true, requestId: id });
  };

  const confirmReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error("Rejection reason cannot be empty!");
      return;
    }
  
    try {
      if (rejectModal.requestId) {
        await rejectRequest(rejectModal.requestId, rejectionReason, token || "");
        toast.success("Request rejected successfully!");
  
        // Update the local state by removing the rejected request or adding rejection reason
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== rejectModal.requestId)
        );
      }
      setRejectModal({ show: false, requestId: null });
      setRejectionReason("");
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-4/5 p-5">
        <h1 className="text-3xl font-bold mb-4">Resource Requests</h1>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setStatusFilter("approved")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Approved Requests
          </button>
          <button
            onClick={() => setStatusFilter("rejected")}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Rejected Requests
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Pending Requests
          </button>
        </div>

        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border p-2">Resource Type</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Urgency Level</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td className="border p-2">{request.resourceType}</td>
                <td className="border p-2">{request.quantity}</td>
                <td className="border p-2">{request.urgencyLevel}</td>
                <td className="border p-2">
                  {statusFilter === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(request._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(request._id)}
                        className="bg-red-500 text-white px-4 py-2 ml-2 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {statusFilter === "rejected" && (
                    <p>Reason: {request.rejectionReason}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Reject Modal */}
        {rejectModal.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Reject Request</h2>
              <textarea
                placeholder="Enter rejection reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <div className="flex gap-4 mt-4">
                <button
                  onClick={confirmReject}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setRejectModal({ show: false, requestId: null })}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceRequests;
