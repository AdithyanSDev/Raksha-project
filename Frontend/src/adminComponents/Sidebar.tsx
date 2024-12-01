import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../features/auth/adminSlice";
import { useNavigate, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for hamburger and close

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Toggle sidebar
  const [showDonationOptions, setShowDonationOptions] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutAdmin());
    navigate("/");
  };

  return (
    <>
      {/* Hamburger Icon */}
      <div className="md:hidden p-4 bg-green-500 text-white fixed top-0 left-0 w-full z-20 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">
          <Link to="/admin-dashboard" className="hover:text-green-200 transition">
            Raksha
          </Link>
        </h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-2xl focus:outline-none"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gradient-to-br from-green-400 to-green-300 p-5 shadow-lg transition-transform duration-300 z-10 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0 md:w-1/5`}
      >
        <div>
          <h1 className="text-4xl font-bold mb-8 text-white">
            <Link to="/admin-dashboard" className="hover:text-green-100 transition duration-300">
              Raksha
            </Link>
          </h1>
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          />
          <ul className="space-y-4">
            <li className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg cursor-pointer transition-all">
              <Link to="/upload-banner">Banner Upload</Link>
            </li>
            <li className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg cursor-pointer transition-all">
              <Link to="/user-management">User Management</Link>
            </li>
            <li className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg cursor-pointer transition-all">
              <Link to="/resource-management">Resource Management</Link>
            </li>
            <li className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg cursor-pointer transition-all">
              <Link to="/resource-requests">Resource Requests</Link>
            </li>

            {/* Donation Management Dropdown */}
            <li
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg cursor-pointer transition-all flex justify-between items-center"
              onClick={() => setShowDonationOptions(!showDonationOptions)}
            >
              Donation Management
              <span className="text-xl">{showDonationOptions ? "▲" : "▼"}</span>
            </li>
            {showDonationOptions && (
              <ul className="ml-4 space-y-2">
                <li className="bg-green-400 hover:bg-green-500 text-white p-3 rounded-lg cursor-pointer transition-all">
                  <Link to="/donation-management/material">Material Donations</Link>
                </li>
                <li className="bg-green-400 hover:bg-green-500 text-white p-3 rounded-lg cursor-pointer transition-all">
                  <Link to="/donation-management/monetary">Monetary Donations</Link>
                </li>
              </ul>
            )}

            <li className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg cursor-pointer transition-all">
              <Link to="/alert-management">Alert Management</Link>
            </li>
            <li className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg cursor-pointer transition-all">
              <Link to="/volunteer-management">Volunteer Management</Link>
            </li>
          </ul>
        </div>
        <div className="mt-4"> {/* Adds spacing between last item and logout */}
          <button
            className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg cursor-pointer transition-all"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
