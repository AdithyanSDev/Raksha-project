import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ForgotPasswordModalProps {
  closeModal: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ closeModal }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOtp = async () => {
    try {
      await axios.post("/api/users/forgot-password", { email });
      toast.success("OTP sent successfully!");
      setStep(2);
    } catch (error) {
      toast.error("Error sending OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post("/api/users/verify-forgot-otp", { email, otp });
      toast.success("OTP verified successfully!");
      setStep(3);
    } catch (error) {
      toast.error("Invalid OTP. Please check and try again.");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      await axios.post("/api/users/reset-password", { email, newPassword });
      toast.success("Password reset successful!");
      closeModal();
    } catch (error) {
      toast.error("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">
        <button
          onClick={closeModal}
          className="text-gray-500 absolute top-4 right-4 text-2xl"
        >
          &times;
        </button>
        {step === 1 && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              className="border w-full p-3 rounded-lg mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-purple-600 text-white p-3 rounded-lg shadow-lg hover:bg-purple-700 transition font-semibold"
            >
              Send OTP
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
            <p className="mb-4 text-center text-gray-500">
              OTP has been sent to {email}
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              className="border w-full p-3 rounded-lg mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-purple-600 text-white p-3 rounded-lg shadow-lg hover:bg-purple-700 transition font-semibold"
            >
              Verify OTP
            </button>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <input
              type="password"
              placeholder="New Password"
              className="border w-full p-3 rounded-lg mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border w-full p-3 rounded-lg mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-purple-600 text-white p-3 rounded-lg shadow-lg hover:bg-purple-700 transition font-semibold"
            >
              Save Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
