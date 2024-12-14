import React, { useEffect, useState } from "react";
import { fetchUsers, toggleUserStatus, IUser } from "../services/UserService";
import Sidebar from "./Sidebar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 8; // Number of users per page

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        // Filter out users with the role of "admin"
        const nonAdminUsers = fetchedUsers.filter(
          (user) => user.role !== "admin"
        );
        setUsers(nonAdminUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    getUsers();
  }, []);
  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const updatedUser = await toggleUserStatus(userId, !currentStatus);
      console.log(updatedUser)
      // Update the user list state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isBlocked: !currentStatus } : user
        )
      );
  
      // Display success toast
      toast.success(
        currentStatus ? 'User has been blocked successfully' : 'User has been unblocked successfully'
      );
    } catch (error) {
      console.error("Failed to update user status:", error);
      toast.error('Failed to update user status');
    }
  };
  

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-4/5 p-5">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Profile</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id}>
                <td className="border p-2">
                  <img
                    src={user.profilePicture}
                    alt={`${user.username}'s profile`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="border p-2">{user.username}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">
                  {user.isBlocked ? "Blocked" : "Active"}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleToggleStatus(user._id, user.isBlocked)}
                    className={`p-2 rounded ${
                      user.isBlocked ? "bg-red-500" : "bg-green-500"
                    } text-white`}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map(
            (num) => (
              <button
                key={num + 1}
                onClick={() => paginate(num + 1)}
                className={`px-4 py-2 mx-1 border rounded ${
                  currentPage === num + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {num + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
