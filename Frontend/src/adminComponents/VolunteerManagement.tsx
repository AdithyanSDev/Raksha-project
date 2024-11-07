import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { fetchVolunteers } from "../services/volunteerService"; // Fetch function to get the volunteer data
import { VolunteerData } from "../services/volunteerService";
import Sidebar from "./Sidebar";

const VolunteerManagement: React.FC = () => {
  const [volunteers, setVolunteers] = useState<VolunteerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Hook for programmatic navigation

  // Fetch volunteers when component mounts
  useEffect(() => {
    const getVolunteers = async () => {
      try {
        const volunteerData = await fetchVolunteers(); // Call the service
        setVolunteers(volunteerData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch volunteers.");
        setLoading(false);
      }
    };

    getVolunteers();
  }, []);

  if (loading) {
    return <p>Loading volunteers...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-4/5 p-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Volunteer Management</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => navigate("/volunteer-requests")}
          >
            Requests
          </button>
        </div>
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2">Profile Picture</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Skills</th>
              <th className="px-4 py-2">Experience</th>
              <th className="px-4 py-2">Availability</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => (
              <tr key={volunteer.userId} className="border-t">
                <td className="px-4 py-2">
                  <img
                    src={volunteer.profilePicture} // Assuming profilePicture is the correct field
                    alt={`${volunteer.name}'s profile`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-2">{volunteer.name}</td>
                <td className="px-4 py-2">{volunteer.role}</td>
                <td className="px-4 py-2">{volunteer.skills.join(", ")}</td>
                <td className="px-4 py-2">{volunteer.experience} years</td>
                <td className="px-4 py-2">{volunteer.availabilityStatus}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolunteerManagement;
