import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice'; // Import the loginSuccess action
import { loginUser } from '../services/authService'; // Import login service
import { FaGoogle, FaFacebook, FaEnvelope, FaLock } from 'react-icons/fa'; // Icons
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../features/auth/adminSlice';


interface LoginModalProps {
  closeModal: (modalType?: 'login' | 'signup') => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const role = urlParams.get('role'); // Capture role
    
    if (token && role) {
      if (role === 'admin') {
        dispatch(loginAdmin(token));
        localStorage.setItem('adminToken', token);
        navigate('/admin-dashboard');
      } else {
        dispatch(loginSuccess({ token, userId: 'user-id', role }));
        localStorage.setItem('token', token);
        navigate('/');
      }
    }
  }, []);
  
  
  


  const handleGoogleLogin = () => {
    const googleAuthUrl = 'http://localhost:5000/api/auth/google'; // Backend Google OAuth endpoint
    window.open(googleAuthUrl, '_self');
  };
  

  const handleLogin = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await loginUser(email, password, latitude, longitude);
          console.log(response); // Debug log for response

          if (response.token && response.user?.role) {
            if (response.user.role === 'admin') {
              dispatch(loginAdmin(response.token)); // Dispatching the admin login action
              localStorage.setItem('adminToken', response.token); // Storing token locally
              navigate('/admin-dashboard');
            } else {
              // Dispatching user login action with userId
              dispatch(
                loginSuccess({
                  token: response.token,
                  userId: response.user.id, // Ensure the user ID is received in response
                  role: response.user.role,
                })
              );
              // Store token and user information in localStorage
              
              localStorage.setItem('token', response.token);
              localStorage.setItem('role', response.user.role);
              localStorage.setItem('userId', response.user.id); // Store userId in local storage
              navigate('/');
              closeModal();
            }
          } else {
            setError('No token or role received in response');
          }
        } catch (err) {
          setError('Invalid login credentials');
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
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        <button onClick={() => closeModal()} className="text-gray-500 absolute top-4 right-4 text-xl">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {/* Social Media Buttons */}
        <div className="flex justify-center mb-4">
          <button className="bg-blue-600 text-white rounded-full p-2 mx-2">
            <FaFacebook className="text-xl" />
          </button>
          <button className="bg-red-600 text-white rounded-full p-2 mx-2" onClick={handleGoogleLogin}>
            <FaGoogle className="text-xl" />
          </button>
        </div>

        {/* Email Input */}
        <div className="relative mb-4">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            className="border w-full p-2 rounded pl-10"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-4">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            className="border w-full p-2 rounded pl-10"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-2 top-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Login Button */}
        <button className="w-full bg-blue-500 text-white p-2 rounded" onClick={handleLogin}>
          Log In
        </button>

        {/* Register Link */}
        <p className="text-sm mt-4 text-center">
          Don’t have an account?{' '}
          <button onClick={() => closeModal('signup')} className="text-blue-500">
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
