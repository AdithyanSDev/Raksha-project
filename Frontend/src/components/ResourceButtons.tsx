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
    <section className="flex justify-center space-x-6 p-8 bg-green-100">
      <button
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        onClick={handleRequestResourceClick}
      >
        Request Resource
      </button>
      <button
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        onClick={handleViewResourcesClick}
      >
        View Resources
      </button>
      <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600">
        Offer Help
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
