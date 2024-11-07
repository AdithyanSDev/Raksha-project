// EmergencyForm.tsx
import React, { useState } from "react";

interface EmergencyFormProps {
  setIsEmergency: (isEmergency: boolean) => void;
  addMessage?: (text: string, sender: "user" | "bot") => void;
  onSubmit: (emergencyData: any) => Promise<void>;
}

const EmergencyForm: React.FC<EmergencyFormProps> = ({ setIsEmergency, addMessage, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      if (addMessage) {
        addMessage("Thank you for the information. An admin will contact you shortly.", "bot");
      }
      setIsEmergency(false);
    } catch {
      if (addMessage) {
        addMessage("There was an error sending your emergency information. Please try again.", "bot");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="p-2 border border-gray-300 rounded" required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 border border-gray-300 rounded" required />
      <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="p-2 border border-gray-300 rounded" required />
      <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="p-2 border border-gray-300 rounded" required />
      <button type="submit" className="p-2 bg-red-500 text-white rounded">Submit Emergency</button>
    </form>
  );
};

export default EmergencyForm;
