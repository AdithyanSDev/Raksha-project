import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice'; // Import the loginSuccess action

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
                window.location.href = '/'; // Redirect to homepage after OTP verification
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (err) {
            setError('Error verifying OTP. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
                <button onClick={closeModal} className="text-gray-500 absolute top-4 right-4 text-xl">&times;</button>
                <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>

                <div className="relative mb-4">
                    <input
                        className="border w-full p-2 rounded"
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button
                    className="w-full bg-green-500 text-white p-2 rounded"
                    onClick={handleOtpSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default OtpModal;
