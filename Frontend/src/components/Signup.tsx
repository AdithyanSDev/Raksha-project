import { useState } from 'react';
import { signupUser } from '../services/authService';
import OtpModal from './Otp'; // Import the OTP modal
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface SignupModalProps {
  closeModal: (modalType?: 'login' | 'signup') => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ closeModal }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false); // State to toggle OTP modal
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const role: 'user' = 'user';

  const handleGoogleLogin = () => {
    const googleAuthUrl = 'http://localhost:5000/api/auth/google';
    window.open(googleAuthUrl, '_self');
  };

  const handleSignup = async () => {
    if (isSubmitting) return;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
        setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        toast.error('Invalid password format.');
        return;
    }

    if (password !== confirmPassword) {
        setError('Passwords do not match');
        toast.error('Passwords do not match.');
        return;
    }

    setIsSubmitting(true);
    setError('');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });

                try {
                    const response = await signupUser(username, email, password, latitude, longitude, role);
                    if (response) {
                        setShowOtpModal(true);
                        toast.info('Please verify your OTP.');
                    } else {
                        setError('Signup failed. Please try again.');
                        toast.error('Signup failed.');
                    }
                } catch (error) {
                    setError('Error signing up. Please try again.');
                    toast.error('Error signing up.');
                } finally {
                    setIsSubmitting(false);
                }
            },
            () => {
                setError('Unable to obtain location. Please try again.');
                toast.error('Location access denied.');
                setIsSubmitting(false);
            }
        );
    } else {
        setError('Geolocation is not supported by this browser.');
        toast.error('Geolocation is not supported.');
        setIsSubmitting(false);
    }
};

  return (
    <>
      {!showOtpModal ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg flex w-full max-w-3xl overflow-hidden">
            {/* Left Side */}
            <div className="w-1/2 p-8 bg-gradient-to-br from-purple-600 to-purple-400 text-white flex flex-col items-center justify-center">
              <h2 className="text-4xl font-bold mb-2">Come join us!</h2>
              <p className="mt-2 text-center">Sign up to create your account</p>
              <button onClick={() => closeModal('login')} className="mt-5 bg-purple-400 text-white p-3 rounded-lg shadow-lg hover:bg-purple-700 transition font-semibold">
                Already have an account? Sign In
              </button>
            </div>

            {/* Right Side */}
            <div className="w-full md:w-1/2 p-8 relative">
              <button onClick={() => closeModal('signup')} className="text-gray-500 absolute top-4 right-4 text-xl">&times;</button>
              <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

              {/* Social Media Buttons */}
              <div className="flex flex-col items-center mb-6">
                <button
                  className="flex items-center justify-center gap-2 bg-white text-gray-600 border border-gray-300 rounded-full px-6 py-2 shadow hover:shadow-md hover:bg-gray-100 transition"
                  onClick={handleGoogleLogin}
                >
                  <FaGoogle className="text-xl" />
                  <span className="font-medium">Sign in with Google</span>
                </button>

                <div className="flex items-center w-full mt-4">
                  <div className="flex-grow h-px bg-gray-300"></div>
                  <span className="mx-2 text-gray-500">OR</span>
                  <div className="flex-grow h-px bg-gray-300"></div>
                </div>
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
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="relative w-full mb-6">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  className="border w-full p-3 rounded-lg pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500 text-center mb-4">{error}</p>}

              <button
                onClick={handleSignup}
                disabled={isSubmitting}
                className={`w-full p-3 rounded-lg shadow-lg font-semibold ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700 transition'}`}
              >
                {isSubmitting ? 'Processing...' : 'Sign Up'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <OtpModal
          email={email}
          username={username}
          password={password}
          latitude={location?.latitude || 0}
          longitude={location?.longitude || 0}
          role={role}
          closeModal={() => setShowOtpModal(false)}
        />
      )}
    </>
  );
};

export default SignupModal;
