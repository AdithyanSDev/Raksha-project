// pages/ResourceManagement.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../adminComponents/Sidebar";
import axios from "axios";
import EditResourceModal from "../adminComponents/EditResourceModal"; // Adjust the import path

interface Resource {
  image: string;
  _id: string;
  name: string;
  type: string;
  quantity: number;
  location: string;
  description: string;
  available: boolean;
}

const ResourceManagement: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get("/api/resources/resources");
        setResources(response.data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    fetchResources();
  }, []);

  const handleEdit = (resource: Resource) => {
    setSelectedResource(resource);
    setEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      try {
        await axios.delete(`/api/resources/resources/${id}`);
        setResources(resources.filter((r) => r._id !== id));
      } catch (error) {
        console.error("Error deleting resource:", error);
      }
    }
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedResource(null);
  };

  const handleSaveResource = (updatedResource: Resource) => {
    setResources(resources.map((res) => (res._id === updatedResource._id ? updatedResource : res)));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-4/5 p-5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Resource Management</h1>
          <Link
            to="/create-resource"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Create Resource
          </Link>
        </div>

        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Available</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource._id}>
                <td className="border p-2">{resource.name}</td>
                <td className="border p-2">
                  {resource.image && (
                    <img
                      src={resource.image}
                      alt={resource.name}
                      className="h-16 w-16 object-cover"
                    />
                  )}
                </td>
                <td className="border p-2">{resource.type}</td>
                <td className="border p-2">{resource.quantity}</td>
                <td className="border p-2">{resource.location}</td>
                <td className="border p-2">{resource.available ? "Yes" : "No"}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(resource)}
                    className="bg-green-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(resource._id)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isEditModalOpen && (
          <EditResourceModal
            resource={selectedResource}
            onClose={handleCloseEditModal}
            onSave={handleSaveResource}
          />
        )}
      </div>
    </div>
  );
};

export default ResourceManagement;
