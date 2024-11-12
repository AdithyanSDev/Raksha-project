import { useState } from 'react';
import OtpModal from './Otp';
import { signupUser } from '../services/authService';
import { FaGoogle, FaFacebook, FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface SignupModalProps {
  closeModal: (modalType?: 'login' | 'signup') => void; // Updated to accept modal type
}

const SignupModal: React.FC<SignupModalProps> = ({ closeModal }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const navigate = useNavigate();
  const role: 'user' = 'user';

  const handleGoogleLogin = () => {
    const googleAuthUrl = 'http://localhost:5000/api/auth/google';
    window.open(googleAuthUrl, '_self');
  };

  const handleSignup = async () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await signupUser(username, email, password, latitude, longitude, role);
          if (response) {
            setIsOtpModalVisible(true);
          } else {
            setError('Signup failed. Please try again.');
          }
        } catch (error) {
          setError('Error signing up. Please try again.');
        }
      }, () => {
        setError('Unable to obtain location. Please try again.');
      });
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg flex w-full max-w-3xl overflow-hidden">
        {/* Left Side with Image */}
        <div className="w-1/2 p-8 bg-gradient-to-br from-purple-600 to-purple-400 text-white flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold mb-2">Come join us!</h2>
          <p className="mt-2 text-center">Sign up to create your account</p>
          <button onClick={() => closeModal('login')} className="mt-5 bg-purple-400 text-white p-3 rounded-lg shadow-lg hover:bg-purple-700 transition font-semibold">
            Already have an account? Sign In
          </button>
        </div>

        {/* Right Side with Form */}
        <div className="w-full md:w-1/2 p-8 relative">
          <button onClick={() => closeModal('login')} className="text-gray-500 absolute top-4 right-4 text-xl">&times;</button>
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

          {/* Social Media Buttons */}
          <div className="flex justify-center mb-4">
            <button className="bg-blue-600 text-white rounded-full p-2 mx-2">
              <FaFacebook className="text-xl" />
            </button>
            <button className="bg-red-600 text-white rounded-full p-2 mx-2" onClick={handleGoogleLogin}>
              <FaGoogle className="text-xl" />
            </button>
          </div>

          {/* Input Fields */}
          <div className="relative mb-4">
            <input
              className="border w-full p-2 rounded pl-10"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative mb-4">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              className="border w-full p-2 rounded-lg pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Fields */}
          <div className="relative w-full mb-4">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              className="border w-full p-3 rounded-lg pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="relative w-full mb-6">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              className="border w-full p-3 rounded-lg pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <button onClick={handleSignup} className="w-full bg-purple-600 text-white p-3 rounded-lg shadow-lg hover:bg-purple-700 transition font-semibold">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
