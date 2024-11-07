import { useState } from 'react';
import OtpModal from './Otp';
import { signupUser } from '../services/authService';
import { FaGoogle, FaFacebook, FaEnvelope, FaLock } from 'react-icons/fa';

interface SignupModalProps {
    closeModal: () => void;
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
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    // Default role to 'user'
    const role: 'user' = 'user'; 

    const handleGoogleLogin = () => {
        const googleAuthUrl = 'http://localhost:5000/api/auth/google'; // Backend Google OAuth endpoint
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
                setLatitude(latitude);
                setLongitude(longitude);

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
            }, (_error) => {
                setError('Unable to obtain location. Please try again.');
            });
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
                <button onClick={closeModal} className="text-gray-500 absolute top-4 right-4 text-xl">&times;</button>
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
                        className="border w-full p-2 rounded pl-10"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

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

                <div className="relative mb-4">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                        className="border w-full p-2 rounded pl-10"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button
                    className="w-full bg-green-500 text-white p-2 rounded"
                    onClick={handleSignup}
                >
                    Sign Up
                </button>

                {isOtpModalVisible && (
                    <OtpModal
                        email={email}
                        username={username}
                        password={password}
                        latitude={latitude!}
                        longitude={longitude!}
                        role={role} // Pass the default role to OTP modal
                        closeModal={() => setIsOtpModalVisible(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default SignupModal;
