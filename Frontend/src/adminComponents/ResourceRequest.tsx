import React, { useState, useEffect } from 'react';
import Sidebar from '../adminComponents/Sidebar';
import axios from 'axios';

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
  additionalInfo?: string;
  documents?: string[];
}

const ResourceRequests: React.FC = () => {
  const [requests, setRequests] = useState<ResourceRequest[]>([]);
  const [sortBy, setSortBy] = useState<string>(''); // For sorting logic
  const [currentPage, setCurrentPage] = useState<number>(1);
  const requestsPerPage = 8; // Number of requests per page

  useEffect(() => {
    // Fetch resource requests from the backend
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/resources/resource-request');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching resource requests:', error);
      }
    };
    fetchRequests();
  }, []);

  // Sorting logic
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    if (e.target.value === 'urgency') {
      const sorted = [...requests].sort((a, b) => a.urgencyLevel.localeCompare(b.urgencyLevel));
      setRequests(sorted);
    } else if (e.target.value === 'quantity') {
      const sorted = [...requests].sort((a, b) => b.quantity - a.quantity);
      setRequests(sorted);
    }
  };

  // Pagination logic
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      <div className="w-4/5 p-5">
        <h1 className="text-3xl font-bold mb-4">Resource Requests</h1>

        {/* Sort by dropdown */}
        <div className="mb-4">
          <label htmlFor="sort" className="mr-2">Sort by:</label>
          <select id="sort" value={sortBy} onChange={handleSortChange} className="p-2 border rounded-md">
            <option value="">None</option>
            <option value="urgency">Urgency Level</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>

        {/* Resource requests table */}
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border p-2">Resource Type</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Urgency Level</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Disaster Type</th>
              <th className="border p-2">People Affected</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.map((request) => (
              <tr key={request._id}>
                <td className="border p-2">{request.resourceType}</td>
                <td className="border p-2">{request.quantity}</td>
                <td className="border p-2">{request.urgencyLevel}</td>
                <td className="border p-2">{request.location}</td>
                <td className="border p-2">{request.disasterType}</td>
                <td className="border p-2">{request.numberOfPeopleAffected}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {[...Array(Math.ceil(requests.length / requestsPerPage)).keys()].map((num) => (
            <button
              key={num + 1}
              onClick={() => paginate(num + 1)}
              className={`px-4 py-2 mx-1 border rounded ${currentPage === num + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceRequests;
