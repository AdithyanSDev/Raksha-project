import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchVolunteers, assignTaskToVolunteer } from "../services/volunteerService";
import { VolunteerData } from "../services/volunteerService";
import Sidebar from "./Sidebar";

const VolunteerManagement: React.FC = () => {
  const [volunteers, setVolunteers] = useState<VolunteerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerData | null>(null);
  const [task, setTask] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const getVolunteers = async () => {
      try {
        const volunteerData = await fetchVolunteers();

        // Filter volunteers whose status is "approved"
        const approvedVolunteers = volunteerData.filter(
          (volunteer) => volunteer.status === "Approved"
        );

        setVolunteers(approvedVolunteers);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch volunteers.");
        setLoading(false);
      }
    };
    getVolunteers();
  }, []);

  const handleAssignTask = async () => {
    if (selectedVolunteer && selectedVolunteer._id) {  
      try {
        await assignTaskToVolunteer(selectedVolunteer._id, task);
        setSelectedVolunteer(null);
        setTask("");
        toast.success("Task assigned successfully!");
      } catch (error) {
        toast.error("Failed to assign task. Please try again.");
      }
    } else {
      toast.error("Volunteer ID is missing.");
    }
  };
  

  const handleViewVolunteer = (volunteer: VolunteerData) => {
    navigate(`/volunteer/${volunteer._id}`, { state: { volunteer } });
  };

  if (loading) return <p>Loading volunteers...</p>;
  if (error) return <p>{error}</p>;

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
        <table className="table-auto w-full bg-white shadow-md rounded-lg mt-5">
          <thead>
            <tr>
              <th className="px-4 py-2">Profile Picture</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Skills</th>
              <th className="px-4 py-2">Experience</th>
              <th className="px-4 py-2">Availability</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => (
              <tr key={volunteer.userId} className="border-t">
                <td className="px-4 py-2">
                  <img
                    src={volunteer.profilePicture}
                    alt={`${volunteer.name}'s profile`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-2">{volunteer.name}</td>
                <td className="px-4 py-2">{volunteer.role}</td>
                <td className="px-4 py-2">{volunteer.skills.join(", ")}</td>
                <td className="px-4 py-2">{volunteer.experience} years</td>
                <td className="px-4 py-2">{volunteer.availabilityStatus}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setSelectedVolunteer(volunteer)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Assign Task
                  </button>
                  <button
                    onClick={() => handleViewVolunteer(volunteer)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedVolunteer && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
              <h3 className="text-lg font-bold mb-4">Assign Task to {selectedVolunteer.name}</h3>
              <p><strong>Role:</strong> {selectedVolunteer.role}</p>
              <p><strong>Skills:</strong> {selectedVolunteer.skills.join(", ")}</p>
              <p><strong>Experience:</strong> {selectedVolunteer.experience} years</p>
              
              <input
                type="text"
                placeholder="Enter task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="border p-2 w-full mt-4 mb-4"
              />
              <button onClick={handleAssignTask} className="bg-green-500 text-white px-4 py-2 rounded">
                Submit
              </button>
              <button onClick={() => setSelectedVolunteer(null)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerManagement;
