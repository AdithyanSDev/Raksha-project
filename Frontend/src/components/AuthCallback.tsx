import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    const userId = query.get("id");
    const role = query.get("role");

    if (token && userId && role) {
      // Update state with the retrieved values
      dispatch(
        loginSuccess({
          token,
          userId,
          role,
        })
      );

      // Store values in local storage for persistence
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      // Redirect to the appropriate page based on role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } else {
      console.error("Missing authentication data in callback");
      navigate("/login"); // Redirect to login on failure
    }
  }, [dispatch, navigate]);

  return <div>Loading...</div>; // Add a loading indicator
};

export default AuthCallback;
