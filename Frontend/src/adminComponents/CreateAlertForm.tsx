// src/components/AlertForm.tsx
import React, { useState } from "react";
import { createAlert } from "../services/alertService";
import LocationAutocomplete from "../components/LocationAutocomplete";

interface AlertFormProps {
  onAlertCreated: () => void;
}

const AlertForm: React.FC<AlertFormProps> = ({ onAlertCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [alertType, setAlertType] = useState("");
  const [severity, setSeverity] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!alertType) newErrors.alertType = "Please select an alert type.";
    if (!severity) newErrors.severity = "Please select a severity.";
    if (!placeName.trim()) newErrors.placeName = "Place name is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true); // Disable the button and show processing state
    try {
      await createAlert({
        title,
        description,
        alertType,
        severity,
        placeName,
      });
      setIsSubmitting(false);
      onAlertCreated();
      // Reset form fields after successful submission
      setTitle("");
      setDescription("");
      setAlertType("");
      setSeverity("");
      setPlaceName("");
      setErrors({});
    } catch (error) {
      console.error("Failed to create alert:", error);
      setIsSubmitting(false); // Re-enable the button if submission fails
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded-lg shadow-md mt-4">
      <h3 className="text-xl font-bold mb-4">Create New Alert</h3>
      
      {/* Title Input */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`w-full p-2 mb-2 rounded-lg ${
          errors.title ? "border-red-500" : ""
        }`}
      />
      {errors.title && <p className="text-red-500 text-sm mb-4">{errors.title}</p>}

      {/* Description Textarea */}
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={`w-full p-2 mb-2 rounded-lg ${
          errors.description ? "border-red-500" : ""
        }`}
      />
      {errors.description && (
        <p className="text-red-500 text-sm mb-4">{errors.description}</p>
      )}

      {/* Alert Type Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Alert Type</label>
        <select
          value={alertType}
          onChange={(e) => setAlertType(e.target.value)}
          className={`w-full mt-1 p-3 border rounded-lg focus:ring-2 ${
            errors.alertType ? "border-red-500" : "focus:ring-blue-400"
          }`}
        >
          <option value="">Select Alert Type</option>
          <option value="Weather">Weather</option>
          <option value="Fire">Fire</option>
          <option value="Flood">Flood</option>
          <option value="Earthquake">Earthquake</option>
        </select>
        {errors.alertType && (
          <p className="text-red-500 text-sm">{errors.alertType}</p>
        )}
      </div>

      {/* Severity Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Severity</label>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className={`w-full mt-1 p-3 border rounded-lg focus:ring-2 ${
            errors.severity ? "border-red-500" : "focus:ring-blue-400"
          }`}
        >
          <option value="">Select Severity</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
        {errors.severity && (
          <p className="text-red-500 text-sm">{errors.severity}</p>
        )}
      </div>

      {/* Place Name Autocomplete */}
      <LocationAutocomplete
        value={placeName}
        onChange={setPlaceName}
        placeholder="Search for Place"
      />
      {errors.placeName && (
        <p className="text-red-500 text-sm">{errors.placeName}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className={`bg-green-500 text-white p-2 rounded-lg ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Submit"}
      </button>
    </form>
  );
};

export default AlertForm;
