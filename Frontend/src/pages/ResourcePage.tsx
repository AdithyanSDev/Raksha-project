// ResourcesPage.tsx
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../features/auth/authSlice';

// Updated Resource interface to match the model
interface Resource {
  id: string;
  name: string;
  type: string;
  quantity: number;
  location: string;
  description: string;
  available: boolean; 
  image: string;
}

const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const token = useSelector(selectAuthToken);
  console.log("Token from Redux:", token);
  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch('/api/resources/resources', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <header className="bg-transparent text-green-500 py-4 ">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link to="/" className="text-3xl font-bold hover:underline">
            Raksha
          </Link>
        </div>
      </header>

      {/* Resource Section */}
      <section className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Available Resources Nearby
        </h2>

        {availableResources.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-2xl font-semibold text-gray-500">
              No resources available now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableResources.map((resource) => (
           <div
           key={resource.id}
           className="relative group overflow-hidden rounded-lg shadow-md transform transition-transform hover:scale-95 w-66 h-66"
         >
           {/* Resource Image */}
           <img
             src={resource.image}
             alt={resource.name}
             className="w-full h-full object-cover"
           />
         
           {/* Resource Name (Bottom-Left Overlay) */}
           <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white px-2 py-1">
             <h3 className="text-sm font-semibold">{resource.name}</h3>
           </div>
         
           {/* Hover Overlay with "View Details" Button */}
           <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <button
               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
               onClick={() => handleViewDetails(resource)}
             >
               View Details
             </button>
           </div>
         </div>
         
          
            ))}
          </div>
        )}
      </section>

      {/* Modal for Full Details */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              {selectedResource.name}
            </h2>
            <img
              src={selectedResource.image}
              alt={selectedResource.name}
              className="h-64 w-full object-cover rounded mb-4"
            />
            <p className="text-gray-700">
              <strong>Type:</strong> {selectedResource.type}
            </p>
            <p className="text-gray-700">
              <strong>Capacity:</strong> {selectedResource.quantity}
            </p>
            <p className="text-gray-700">
              <strong>Location:</strong> {selectedResource.location}
            </p>
            <p className="text-gray-700">
              <strong>Available:</strong> {selectedResource.available ? 'Yes' : 'No'}
            </p>
            <p className="text-gray-600 mt-4">{selectedResource.description}</p>
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ResourcesPage;
