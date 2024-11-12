import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { loginUser } from "../services/authService";
import { FaGoogle, FaFacebook, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../features/auth/adminSlice";
import ForgotPasswordModal from "./ForgotPasswordModal";

interface LoginModalProps {
  closeModal: (modalType?: "login" | "signup") => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const role = urlParams.get("role");

    if (token && role) {
      if (role === "admin") {
        dispatch(loginAdmin(token));
        localStorage.setItem("adminToken", token);
        navigate("/admin-dashboard");
      } else {
        dispatch(loginSuccess({ token, userId: "user-id", role }));
        localStorage.setItem("token", token);
        navigate("/");
      }
    }
  }, []);

  const handleGoogleLogin = () => {
    const googleAuthUrl = "http://localhost:5000/api/auth/google";
    window.open(googleAuthUrl, "_self");
  };

  const handleLogin = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await loginUser(
              email,
              password,
              latitude,
              longitude
            );
            if (response.token && response.user?.role) {
              if (response.user.role === "admin") {
                dispatch(loginAdmin(response.token));
                localStorage.setItem("adminToken", response.token);
                navigate("/admin-dashboard");
              } else {
                dispatch(
                  loginSuccess({
                    token: response.token,
                    userId: response.user.id,
                    role: response.user.role,
                  })
                );
                localStorage.setItem("token", response.token);
                localStorage.setItem("role", response.user.role);
                localStorage.setItem("userId", response.user.id);
                navigate("/");
                closeModal();
              }
            } else {
              setError("No token or role received in response");
            }
          } catch (err) {
            setError("Invalid login credentials");
          }
        },
        () => {
          setError("Unable to obtain location. Please try again.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex">
        {/* Left side with image */}
        <div className="w-1/2 p-8 bg-gradient-to-br from-purple-600 to-purple-400 text-white flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold mb-2">Welcome back!</h2>
          <p className="mt-2 text-center">Sign in to access your account</p>
        </div>

        {/* Right side with form */}
        <div className="w-1/2 p-10 relative flex flex-col items-center">
          <button
            onClick={() => closeModal()}
            className="text-gray-500 absolute top-4 right-4 text-2xl"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-6">Login</h2>

          <div className="flex justify-center mb-6">
            <button className="bg-blue-600 text-white rounded-full p-3 mx-2 shadow-md hover:bg-blue-700 transition">
              <FaFacebook className="text-xl" />
            </button>
            <button
              className="bg-red-600 text-white rounded-full p-3 mx-2 shadow-md hover:bg-red-700 transition"
              onClick={handleGoogleLogin}
            >
              <FaGoogle className="text-xl" />
            </button>
          </div>

          <div className="relative w-full mb-4">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              className="border w-full p-3 rounded-lg pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative w-full mb-6">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              className="border w-full p-3 rounded-lg pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            <span onClick={() => setShowForgotPasswordModal(true)}>
              Forgot Password?
            </span>

            {showForgotPasswordModal && (
              <ForgotPasswordModal
                closeModal={() => setShowForgotPasswordModal(false)}
              />
            )}
          </div>

       

          <button className="w-full bg-purple-600 text-white p-3 rounded-lg shadow-lg hover:bg-purple-700 transition font-semibold" onClick={handleLogin}>
            Log In
          </button>

          <p className="text-sm mt-6 text-center">
            Don’t have an account?{" "}
            <button
              onClick={() => closeModal("signup")}
              className="text-purple-600 font-semibold hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
