import React, { useState } from "react";
import Sidebar from "../adminComponents/Sidebar";
import { useNavigate } from "react-router-dom";
import api from "../services/axiosConfig";

const CreateResource: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    quantity: 0,
    location: "",
    description: "",
    available: true,
  });
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.type) newErrors.type = "Type is required.";
    if (formData.quantity <= 0) newErrors.quantity = "Quantity must be greater than 0.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!image) newErrors.image = "Image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setErrors({ ...errors, image: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("type", formData.type);
    formDataToSubmit.append("quantity", formData.quantity.toString());
    formDataToSubmit.append("location", formData.location);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("available", formData.available.toString());
    if (image) {
      formDataToSubmit.append("image", image);
    }

    try {
      await api.post("/api/resources/resources", formDataToSubmit, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/resource-management");
    } catch (error) {
      console.error("Error creating resource:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-4/5 p-5">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Resource</h1>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Type</option>
              <option value="Camp">Camp</option>
              <option value="School">School</option>
              <option value="Hospital">Hospital</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Available
            </label>
            <select
              name="available"
              value={String(formData.available)}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300"
          >
            Create Resource
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateResource;
