// src/components/AdminProtectedRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";

interface AdminProtectedRouteProps {
  component: React.ComponentType<any>;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const isAdminLoggedIn = useSelector((state: RootState) => state.admin.isAdminLoggedIn);
  const location = useLocation();

  if (!isAdminLoggedIn) {
    // Show toast notification
    toast.error("Admin access only. Please log in as admin.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Redirect to admin login page
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return <Component {...rest} />;
};

export default AdminProtectedRoute;
