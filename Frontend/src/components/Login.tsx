import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { loginUser } from "../services/authService";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../features/auth/adminSlice";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { store } from "../redux/store";
import { toast } from "react-toastify";

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
  const authState = useSelector((state: any) => state.auth);
  
  useEffect(() => {
    toast.success(
      "You can use email: testuser@gmail.com and password: Testuser@123 for login.",
      { autoClose: 10000 }
    );
  }, []);

  useEffect(() => {
      console.log("Redux Auth State:", authState);
  }, [authState]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const role = urlParams.get("role");
    console.log("Received token:", token);
    console.log("Received role:", role);
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
      urlParams.delete("token");
      urlParams.delete("role");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [dispatch, navigate]);
  
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
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex flex-col sm:flex-row">
        {/* Left side with image */}
        <div className="w-full sm:w-1/2 p-8 bg-gradient-to-br from-blue-400 to-green-400 text-white flex flex-col items-center justify-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">Welcome back!</h2>
          <p className="mt-2 text-center text-sm sm:text-base">Sign in to access your account</p>
        </div>

        {/* Right side with form */}
        <div className="w-full sm:w-1/2 p-6 sm:p-10 relative flex flex-col items-center bg-white ">
          <button
            onClick={() => closeModal()}
            className="text-gray-500 absolute top-4 right-4 text-2xl"
          >
            &times; 
          </button>
          <h2 className="text-2xl font-bold mb-6">Login</h2>

          <div className="flex flex-col items-center mb-6 w-full">
            {/* Google Button */}
            <button
              className="flex items-center justify-center gap-2 bg-blue-100 text-gray-600 border border-gray-300 rounded-full px-6 py-2 shadow hover:shadow-md hover:bg-gray-100 transition"
              onClick={handleGoogleLogin}
            >
               <FaGoogle className="text-xl" />
              <span className="font-medium">Sign in with Google</span>
            </button>

            {/* Divider with OR */}
            <div className="flex items-center w-full mt-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-2 text-gray-500">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
          </div>

          <div className="relative w-full mb-4">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              className="border w-full p-3 rounded-lg pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative w-full mb-6">
            <FaLock className="absolute left-3 top-1/4 transform -translate-y-1/4 text-gray-500" />
            <input
              className="border w-full p-3 rounded-lg pl-10 pr-16 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/4 transform -translate-y-1/4 text-gray-500 hover:text-green-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>

            <div className="mt-2">
              <span
                className="text-sm text-blue-600 cursor-pointer hover:underline"
                onClick={() => setShowForgotPasswordModal(true)}
              >
                Forgot Password?
              </span>
            </div>

            {showForgotPasswordModal && (
              <ForgotPasswordModal closeModal={() => setShowForgotPasswordModal(false)} />
            )}
          </div>

          <button
            className="w-full bg-green-500 text-white p-3 rounded-lg shadow-lg hover:bg-green-700 transition font-semibold"
            onClick={handleLogin}
          >
            Log In
          </button>

          <p className="text-sm mt-6 text-center">
            Don’t have an account?{" "}
            <button
              onClick={() => closeModal("signup")}
              className="text-green-600 font-semibold hover:underline"
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
