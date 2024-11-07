// src/components/AlertForm.tsx
import React, { useState } from "react";
import { createAlert } from "../services/alertService";
import LocationAutocomplete from "../components/LocationAutocomplete"; // Importing the autocomplete component

interface AlertFormProps {
  onAlertCreated: () => void;
}

const AlertForm: React.FC<AlertFormProps> = ({ onAlertCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [alertType, setAlertType] = useState("");
  const [severity, setSeverity] = useState("");
  const [placeName, setPlaceName] = useState(""); // Field for place name

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAlert({
        title,
        description,
        alertType,
        severity,
        placeName,
      });
      onAlertCreated();
    } catch (error) {
      console.error("Failed to create alert:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded-lg shadow-md mt-4">
      <h3 className="text-xl font-bold mb-4">Create New Alert</h3>
      
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 rounded-lg"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 rounded-lg"
        required
      />

      {/* Alert Type Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Alert Type</label>
        <select
          value={alertType}
          onChange={(e) => setAlertType(e.target.value)}
          className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select Alert Type</option>
          <option value="Weather">Weather</option>
          <option value="Fire">Fire</option>
          <option value="Flood">Flood</option>
          <option value="Earthquake">Earthquake</option>
        </select>
      </div>

      {/* Severity Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Severity</label>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select Severity</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      {/* Place Name Autocomplete */}
      <LocationAutocomplete
        value={placeName}
        onChange={setPlaceName} // Update placeName when suggestion is clicked
        placeholder="Search for Place"
      />

      <button type="submit" className="bg-green-500 text-white p-2 rounded-lg">
        Submit
      </button>
    </form>
  );
};

export default AlertForm;
