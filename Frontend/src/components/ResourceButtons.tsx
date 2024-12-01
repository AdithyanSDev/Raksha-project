import React, { useState } from 'react';
import ResourceRequest from './ResourceRequest'; // Import the modal component
import { useNavigate } from 'react-router-dom';

const ResourceButtons: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestResourceClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      const response = await fetch('/api/resources/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Request sent successfully');
      } else {
        alert('Failed to send the request');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error submitting the request');
    }
  };
  const navigate = useNavigate();
  const handleViewResourcesClick = () => {
    navigate('/resources'); // Redirect to resources page
  };

  return (
    <section className="flex justify-center space-x-6 p-8 bg-gradient-to-r from-green-100 via-blue-50 to-green-100 shadow-md">
  <button
    className="relative bg-green-500 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl group"
    onClick={handleRequestResourceClick}
  >
    <span className="absolute inset-0 rounded-xl bg-green-600 opacity-0 group-hover:opacity-20 transition-all duration-300 ease-in-out"></span>
    <span className="relative text-lg font-semibold tracking-wide">Request Resource</span>
  </button>
  
  <button
    className="relative bg-green-500 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl group"
    onClick={handleViewResourcesClick}
  >
    <span className="absolute inset-0 rounded-xl bg-green-600 opacity-0 group-hover:opacity-20 transition-all duration-300 ease-in-out"></span>
    <span className="relative text-lg font-semibold tracking-wide">View Resources</span>
  </button>
  
  <button
    className="relative bg-red-500 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl group"
    onClick={handleRequestResourceClick}
  >
    <span className="absolute inset-0 rounded-xl bg-red-600 opacity-0 group-hover:opacity-20 transition-all duration-300 ease-in-out"></span>
    <span className="relative text-lg font-semibold tracking-wide">Offer Help</span>
  </button>

  {/* Render the modal */}
  <ResourceRequest
    isOpen={isModalOpen}
    onClose={handleCloseModal}
    onSubmit={handleFormSubmit}
  />
</section>

  );
};

export default ResourceButtons;
