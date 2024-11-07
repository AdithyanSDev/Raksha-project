// ResourcesPage.tsx
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

// Updated Resource interface to match the model
interface Resource {
  id: string;
  name: string;
  type: string;
  quantity: number;
  location: string;
  description: string;
  available: boolean; // Only show resources if this is true
  image: string;
}

const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch('/api/resources/resources'); // Fetching from the backend
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const handleViewDetails = (resource: Resource) => {
    setSelectedResource(resource); // Open modal with resource details
  };

  const handleCloseModal = () => {
    setSelectedResource(null); // Close modal
  };

  // Filter out resources that are not available
  const availableResources = resources.filter((resource) => resource.available);

  return (
    <div>
      {/* Header */}
      <Header />

      {/* Resource Section */}
      <section className="p-8">
        <h2 className="text-2xl font-bold mb-6">Available Resources</h2>

        {/* Check if there are any available resources */}
        {availableResources.length === 0 ? (
          // No resources available, show message
          <div className="flex items-center justify-center h-64">
            <p className="text-3xl font-bold text-gray-600 text-center">
               No resources available now.
            </p>
          </div>
        ) : (
          // Display the available resources
          <div className="grid grid-cols-3 gap-6">
            {availableResources.map((resource) => (
              <div
                key={resource.id}
                className="border border-gray-300 p-4 shadow-md rounded-md"
                style={{ width: '300px' }} // Increased card size
              >
                <img
                  src={resource.image}
                  alt={resource.name}
                  className="h-48 w-full object-cover mb-4 rounded" // Increased image height to h-48, keeping the cropping effect
                />
                <h3 className="font-bold text-lg">{resource.name}</h3>
                <p className="text-sm text-gray-600">{resource.description}</p>
                <button
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600"
                  onClick={() => handleViewDetails(resource)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal for Full Details */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              X
            </button>

            {/* Resource Name */}
            <h2 className="text-2xl font-bold mb-4">{selectedResource.name}</h2>

            {/* Resource Image */}
            <img
              src={selectedResource.image}
              alt={selectedResource.name}
              className="h-64 w-full object-cover mb-4 rounded"
            />

            {/* Resource Type */}
            <p className="text-gray-700">
              <strong>Type:</strong> {selectedResource.type}
            </p>

            {/* Resource Quantity */}
            <p className="text-gray-700">
              <strong>Capacity:</strong> {selectedResource.quantity}
            </p>

            {/* Resource Location */}
            <p className="text-gray-700">
              <strong>Location:</strong> {selectedResource.location}
            </p>

            {/* Resource Availability */}
            <p className="text-gray-700">
              <strong>Available:</strong> {selectedResource.available ? 'Yes' : 'No'}
            </p>

            {/* Resource Description */}
            <p className="text-gray-600 my-4">{selectedResource.description}</p>

            {/* Close button at the bottom */}
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ResourcesPage;
