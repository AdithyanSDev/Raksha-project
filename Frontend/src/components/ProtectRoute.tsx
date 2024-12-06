// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Show toast notification
    toast.error("Please log in to access this page.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Redirect to home page
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
