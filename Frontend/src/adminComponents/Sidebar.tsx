// components/Sidebar.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../features/auth/adminSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDonationOptions, setShowDonationOptions] = useState(false);

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
        <li className="bg-green-400 p-3 rounded-lg">
          <Link to="/upload-banner">Banner Upload</Link>
        </li>
        <li className="bg-green-400 p-3 rounded-lg">
          <Link to="/user-management">User Management</Link>
        </li>
        <li className="bg-green-400 p-3 rounded-lg">
          <Link to="/resource-management">Resource Management</Link>
        </li>
        <li className="bg-green-400 p-3 rounded-lg">
          <Link to="/resource-requests">Resource Requests</Link>
        </li>

        {/* Donation Management Dropdown */}
        <li
          className="bg-green-400 p-3 rounded-lg"
          onClick={() => setShowDonationOptions(!showDonationOptions)}
        >
          Donation management
        </li>
        {showDonationOptions && (
          <ul className="ml-4 space-y-2">
            <li className="bg-green-200 p-3 rounded-lg">
              <Link to="/donation-management/material">Material Donations</Link>
            </li>
            <li className="bg-green-200 p-3 rounded-lg">
              <Link to="/donation-management/monetary">Monetary Donations</Link>
            </li>
          </ul>
        )}

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
