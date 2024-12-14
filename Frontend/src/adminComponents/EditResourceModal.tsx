// components/EditResourceModal.tsx
import React, { useState, useEffect } from "react";
import api from "../services/axiosConfig";

interface EditResourceModalProps {
  resource: Resource | null;
  onClose: () => void;
  onSave: (updatedResource: Resource) => void;
}

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

const EditResourceModal: React.FC<EditResourceModalProps> = ({
  resource,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: resource?.name || "",
    type: resource?.type || "",
    quantity: resource?.quantity || 0,
    location: resource?.location || "",
    available: resource?.available || false,
    description: resource?.description || "",
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (resource) {
      setImagePreview(resource.image);
      setFormData((prev) => ({ ...prev, image: null }));
    }
  }, [resource]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
  };

  const handleSubmit = async () => {
    if (resource) {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("type", formData.type);
      formDataToSubmit.append("quantity", String(formData.quantity));
      formDataToSubmit.append("location", formData.location);
      formDataToSubmit.append("available", String(formData.available));
      formDataToSubmit.append("description", formData.description);
      if (formData.image) {
        formDataToSubmit.append("image", formData.image);
      }

      try {
        const response = await api.put(`/api/resources/resources/${resource._id}`, formDataToSubmit, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        onSave(response.data);
        onClose();
      } catch (error) {
        console.error("Error updating resource:", error);
      }
    }
  };

  if (!resource) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl mb-4">Edit Resource</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Type</label>
            <input
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border p-2 w-full"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Quantity</label>
            <input
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="border p-2 w-full"
              type="number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border p-2 w-full"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Available</label>
            <input
              name="available"
              type="checkbox"
              checked={formData.available}
              onChange={(e) => setFormData((prev) => ({ ...prev, available: e.target.checked }))}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Image</label>
            {imagePreview ? (
              <div className="flex items-center">
                <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover mr-4" />
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete Image
                </button>
              </div>
            ) : (
              <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 w-full" />
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditResourceModal;
