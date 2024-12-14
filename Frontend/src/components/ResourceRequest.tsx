import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { sendResourceRequest } from "../services/resourceService";
import { CSSTransition } from "react-transition-group";
import LocationAutocomplete from "./LocationAutocomplete";
import { selectAuthUserId, selectAuthToken } from "../features/auth/authSlice";

interface ResourceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

interface ResourceRequestData {
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
  documents?: FileList;
}

const ResourceRequestModal: React.FC<ResourceRequestModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ResourceRequestData>({
    resourceType: "",
    quantity: 0,
    description: "",
    location: "",
    address: "",
    contactInfo: "",
    urgencyLevel: "",
    disasterType: "",
    numberOfPeopleAffected: 0,
    additionalInfo: "",
    documents: undefined,
  });

  const userId = useSelector(selectAuthUserId);
  console.log(userId)
  const token = useSelector(selectAuthToken);
  console.log(token)
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      documents: e.target.files || undefined,
    });
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[1-9]\d{9}$/; // No white space, exactly 10 digits, no leading zeros
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneRegex = /^(?!0{10})\d{10}$/;

    if (!phoneRegex.test(formData.contactInfo)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!token || !userId) {
      toast.error("Please log in to submit a request");
      return;
    }

    const resourceRequestData = {
      ...formData,
      userId,
    };

    try {
      const response = await sendResourceRequest(resourceRequestData, token);
      onSubmit(resourceRequestData);
      onClose();
      toast.success("Request submitted successfully");
    } catch (error) {
      toast.error("Error submitting the request");
    }
    console.log(resourceRequestData)
  };

  // Modal animations with transition
  if (!isOpen) return null;

  return (
    <>
       <ToastContainer position="top-right" autoClose={3000} />
      <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-80 transition-opacity duration-300 ease-in-out z-[1100]">
          <div className="modal-container relative bg-white p-8 rounded-xl shadow-2xl max-h-[90vh] w-full max-w-4xl overflow-y-auto transform transition-transform duration-300 ease-in-out scale-105">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-[1101]"
              onClick={onClose}
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Request a Resource
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Resource Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Resource Type
                </label>
                <select
                  name="resourceType"
                  value={formData.resourceType}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select Resource Type</option>
                  <option value="Food">Food</option>
                  <option value="Medical Supplies">Medical Supplies</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Shelter">Shelter</option>
                  <option value="Water">Water</option>
                </select>
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Provide a description"
                />
              </div>

              {/* Location */}
              <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
              <LocationAutocomplete
                value={formData.location}
                onChange={(location) => setFormData({ ...formData, location })}
                onSelect={onClose} // Close modal when a location is selected
              />

              {/* Address */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter address"
                />
              </div>

              {/* Contact Info */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Contact Info
                </label>
                <input
                  type="text"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter contact info"
                  required
                />
              </div>

              {/* Other fields like urgency level, disaster type, number of people affected, additional info, etc */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Urgency Level
                </label>
                <select
                  name="urgencyLevel"
                  value={formData.urgencyLevel}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select Urgency Level</option>
                  <option value="Immediate">Immediate</option>
                  <option value="High">High</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              {/* Disaster Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Disaster Type
                </label>
                <select
                  name="disasterType"
                  value={formData.disasterType}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select Disaster Type</option>
                  <option value="Earthquake">Earthquake</option>
                  <option value="Flood">Flood</option>
                  <option value="Fire">Fire</option>
                  <option value="Hurricane">Hurricane</option>
                </select>
              </div>

              {/* Number of People Affected */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Number of People Affected
                </label>
                <input
                  type="number"
                  name="numberOfPeopleAffected"
                  value={formData.numberOfPeopleAffected}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Additional Info */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Provide any additional details"
                />
              </div>
              {/* File Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Attach Documents
                </label>
                <input
                  type="file"
                  name="documents"
                  multiple
                  onChange={handleFileChange}
                  className="w-full mt-1 p-3 border rounded-lg"
                />
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg transition-colors"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-6 rounded-lg shadow-lg transition-colors"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default ResourceRequestModal;
