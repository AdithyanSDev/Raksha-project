import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice'; // Import the loginSuccess action
import { toast } from 'react-toastify';

interface OtpModalProps {
    email: string;
    username: string;
    password: string;
    latitude: number;
    longitude: number;
    role: 'admin' | 'user'; // Include the role here
    closeModal: () => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ email, username, password, latitude, longitude, role, closeModal }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch(); // Get the dispatch function from Redux

    const handleOtpSubmit = async () => {
        try {
            const response = await axios.post('/api/users/verify-otp', { email, otp, username, password, latitude, longitude, role });
            const { token } = response.data;
    
            if (token) {
                localStorage.setItem('token', token);
                dispatch(loginSuccess({ token })); // Dispatch the loginSuccess action
    
                // Show success toast
                toast.success('Signed up successfully!');
    
                // Redirect to homepage after a short delay to let the user see the toast
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (err) {
            setError('Error verifying OTP. Please try again.');
        }
    };

    useEffect(() => {
        setError(''); // Clear error when the modal is opened
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fade-in">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
                {/* Close Button */}
                <button
                    onClick={closeModal}
                    className="text-gray-500 absolute top-4 right-4 text-xl focus:outline-none hover:text-gray-700"
                    aria-label="Close Modal"
                >
                    &times;
                </button>
                {/* Title */}
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Verify OTP</h2>
                {/* Dynamic Message */}
                <p className="text-sm text-gray-600 mb-4">
                    An OTP has been sent to your email: <span className="font-semibold">{email}</span>. Please check your inbox.
                </p>

                {/* OTP Input */}
                <div className="relative mb-4">
                    <input
                        className="border w-full p-2 rounded focus:ring-2 focus:ring-green-400 outline-none"
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

                {/* Submit Button */}
                <button
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    onClick={handleOtpSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default OtpModal;
