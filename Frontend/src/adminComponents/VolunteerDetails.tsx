import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VolunteerData, fetchVolunteerById } from "../services/volunteerService"; // Import your service to fetch volunteer data
import Sidebar from "./Sidebar";

const VolunteerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the `id` parameter from the URL
  const navigate = useNavigate();
  const [volunteer, setVolunteer] = useState<VolunteerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getVolunteer = async () => {
      try {
        if (id) {
          const volunteerData = await fetchVolunteerById(id); // Fetch volunteer by id
          setVolunteer(volunteerData);
        }
      } catch (error) {
        setError("Failed to load volunteer details.");
      } finally {
        setLoading(false);
      }
    };
    getVolunteer();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!volunteer) return <p>Volunteer not found.</p>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Volunteer Details */}
      <div className="flex-1 p-8 bg-white rounded-lg shadow-md ml-10">
        <div className="flex items-center space-x-6">
          <img
            src={volunteer.profilePicture || "/default-profile.png"}
            alt={`${volunteer.name}'s profile`}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{volunteer.name}</h2>
            <p className="text-lg text-gray-600">{volunteer.role}</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p><strong>Phone Number:</strong> {volunteer.user?.phoneNumber}</p>
            <p><strong>Location:</strong> {volunteer.user?.location.latitude}, {volunteer.user?.location.longitude}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p><strong>Skills:</strong> {volunteer.skills.join(", ")}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p><strong>Experience:</strong> {volunteer.experience} years</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p><strong>Assigned Task:</strong> {volunteer.tasks?.join(", ") || "None"}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p><strong>Availability Status:</strong> {volunteer.availabilityStatus}</p>
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-6"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default VolunteerDetails;
