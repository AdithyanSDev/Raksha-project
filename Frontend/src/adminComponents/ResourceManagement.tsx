import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../adminComponents/Sidebar";
import axios from "axios";
import EditResourceModal from "../adminComponents/EditResourceModal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

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
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this resource? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/resources/resources/${id}`);
        setResources(resources.filter((r) => r._id !== id));
        Swal.fire("Deleted!", "The resource has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting resource:", error);
        Swal.fire("Error", "Failed to delete the resource.", "error");
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
          <Link to="/create-resource" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Create Resource
          </Link>
        </div>

        {resources.length === 0 ? (
          <div className="text-center mt-10 text-gray-600">
            <p className="text-lg">No resources available at the moment.</p>
          </div>
        ) : (
          <table className="w-full table-auto bg-white rounded-lg shadow-md overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Quantity</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Available</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => (
                <tr
                  key={resource._id}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="p-4">{resource.name}</td>
                  <td className="p-4">
                    {resource.image && (
                      <img src={resource.image} alt={resource.name} className="h-16 w-16 object-cover rounded" />
                    )}
                  </td>
                  <td className="p-4">{resource.type}</td>
                  <td className="p-4">{resource.quantity}</td>
                  <td className="p-4">{resource.location}</td>
                  <td className="p-4">{resource.available ? "Yes" : "No"}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(resource)}
                      className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(resource._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

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
