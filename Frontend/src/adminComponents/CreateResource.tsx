import React, { useState } from 'react';
import Sidebar from '../adminComponents/Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateResource: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    quantity: 0,
    location: '',
    description: '',
    available: true,
  });
  const [image, setImage] = useState<File | null>(null); // Add state to store the selected image
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]); // Set the selected image file
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataToSubmit = new FormData();
    
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('type', formData.type);
    formDataToSubmit.append('quantity', formData.quantity.toString());
    formDataToSubmit.append('location', formData.location);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('available', formData.available.toString());
    
    if (image) {
      formDataToSubmit.append('image', image); // Add image to FormData
    }

    try {
      await axios.post('/api/resources/resources', formDataToSubmit, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/resource-management');
    } catch (error) {
      console.error('Error creating resource:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-4/5 p-5">
        <h1 className="text-3xl font-bold mb-4">Create Resource</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border"
            />
          </div>
          <div className="mb-4">
            <label className="block">Available</label>
            <select name="available" value={String(formData.available)} onChange={handleChange} className="w-full p-2 border">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block">Image</label>
            <input type="file" onChange={handleImageChange} accept="image/*" className="w-full p-2 border" />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Create Resource</button>
        </form>
      </div>
    </div>
  );
};

export default CreateResource;
