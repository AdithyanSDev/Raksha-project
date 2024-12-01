import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { VolunteerData, fetchVolunteerById, updateVolunteerProfile } from "../services/volunteerService";
import ProfileSidebar from "./ProfileSidebar";
import Footer from "./Footer";

import LocationAutocomplete from "./LocationAutocomplete"; // Import the location component

const VolunteerProfile: React.FC = () => {
  const { volunteerId } = useParams<{ volunteerId: string }>();
  const [volunteer, setVolunteer] = useState<VolunteerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (volunteerId) {
        try {
          const volunteerData = await fetchVolunteerById(volunteerId);
          setVolunteer(volunteerData);
        } catch (error) {
          setError("Failed to load volunteer profile.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [volunteerId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVolunteer((prev) => prev ? { ...prev, [name]: value } : null);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setVolunteer((prev) => prev ? { ...prev, role: value } : null);
  };

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setVolunteer((prev) => prev ? { ...prev, availabilityStatus: value } : null);
  };

  const handleSave = async () => {
    if (volunteerId && volunteer) {
      try {
        const updatedVolunteer = await updateVolunteerProfile(volunteerId, volunteer);
        setVolunteer(updatedVolunteer);
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update volunteer profile", error);
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-100 to-blue-100">
    <header className="bg-transparent text-green-500 py-4 text-3xl font-bold w-full">
      <Link to="/" className="hover:underline ml-4">Raksha</Link>
    </header>
    <div className="flex flex-col lg:flex-row flex-grow">
      <ProfileSidebar
        username={volunteer?.name || ""}
        profilePicture={volunteer?.profilePicture || "/default-profile.png"}
        onOpenModal={() => setIsEditing(true)}
        onLogout={() => {}}
      />
      <div className="flex-grow m-4 bg-gradient-to-r from-purple-100 to-green-100 p-8 rounded-md shadow-lg  transform transition-transform hover:scale-95 mb-5 mt-5 ml-6 mr-6">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Volunteer Profile</h2>
        {isEditing ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Edit Profile</h2>
            {[{
              label: "Name", name: "name", value: volunteer?.name || ""
            }, {
              label: "Email", name: "email", value: volunteer?.email || ""
            }, {
              label: "Phone", name: "phone", value: volunteer?.phone || ""
            }].map((field) => (
              <div key={field.name}>
                <label className="block text-gray-600 mb-2">{field.label}:</label>
                <input
                  type="text"
                  name={field.name}
                  value={field.value}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            {/* Role Dropdown */}
            <div>
              <label className="block text-gray-600 mb-2">Role:</label>
              <select
                name="role"
                value={volunteer?.role || ""}
                onChange={handleRoleChange}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a role</option>
                <option value="Search & Rescue">Search & Rescue</option>
                <option value="Logistics & Supplies">Logistics & Supplies</option>
                <option value="Communication">Communication</option>
              </select>
            </div>
            {/* Save and Cancel Buttons */}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">{volunteer?.name}</h2>
            <p className="text-gray-600">Role: {volunteer?.role || "N/A"}</p>
            <p className="text-gray-600">Skills: {volunteer?.skills?.join(", ") || "N/A"}</p>
            <p className="text-gray-600">Email: {volunteer?.email}</p>
            <p className="text-gray-600">Phone: {volunteer?.phone}</p>
            <p className="text-gray-600">
              Location: {volunteer?.location ? `${volunteer.location.latitude}, ${volunteer.location.longitude}` : "N/A"}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
    <Footer />
  </div>
  
  );
};

export default VolunteerProfile;
