// components/Sidebar.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../features/auth/adminSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutAdmin());
    navigate("/");
  };

  return (
    <div className="w-1/5 bg-green-300 p-5">
      <h1 className="text-4xl font-bold mb-8">
        <Link to="/admin-dashboard">Raksha</Link>
      </h1>
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 mb-6 rounded-lg"
      />
      <ul className="space-y-4">
         {/* Add the Banner link */}
         <li className="bg-green-400 p-3 rounded-lg">
          <Link to="/upload-banner">Banner Upload</Link>
        </li>
        <li className="bg-green-400 p-3 rounded-lg">User management</li>
        <li className="bg-green-400 p-3 rounded-lg">
          <Link to="/resource-management">Resource Management</Link>
        </li>
        <li className="bg-green-400 p-3 rounded-lg">
          <Link to="/resource-requests">Resource Requests</Link>
        </li>
        <li className="bg-green-400 p-3 rounded-lg">Donation management</li>
        <li className="bg-green-400 p-3 rounded-lg">
          <Link to="/alert-management">Alert Management</Link>
        </li>
        <li className="bg-green-400 p-3 rounded-lg">
          <Link to="/volunteer-management">Volunteer management</Link>
        </li>
        <li className="bg-green-400 p-3 rounded-lg">Reports</li>
        <li
          className="bg-red-500 text-white p-3 rounded-lg"
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
