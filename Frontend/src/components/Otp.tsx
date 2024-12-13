import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

interface OtpModalProps {
    email: string;
    username: string;
    password: string;
    latitude: number;
    longitude: number;
    role: 'admin' | 'user';
    closeModal: () => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ email, username, password, latitude, longitude, role, closeModal }) => {
    const [otp, setOtp] = useState(new Array(4).fill(''));
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(30); // 30-second timer
    const [isOtpExpired, setIsOtpExpired] = useState(false);
    const [isResendDisabled, setIsResendDisabled] = useState(true); // Disable resend initially
    const dispatch = useDispatch();

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(countdown);
        } else {
            setIsResendDisabled(false); // Enable resend button
        }
    }, [timer]);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isOtpExpired) {
            toast.error('OTP expired. Please request a new one.');
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = element.value;

        setOtp(newOtp);

        if (element.value && index < otp.length - 1) {
            const nextSibling = document.getElementById(`otp-input-${index + 1}`);
            nextSibling?.focus();
        } else if (!element.value && index > 0) {
            const prevSibling = document.getElementById(`otp-input-${index - 1}`);
            prevSibling?.focus();
        }
    };

    const handleOtpSubmit = async () => {
        if (isOtpExpired) {
            toast.error('OTP expired. Please request a new one.');
            return;
        }

        const enteredOtp = otp.join('');
        if (enteredOtp.length !== 4) {
            setError('Please enter the complete OTP.');
            return;
        }

        try {
            const response = await axios.post('/api/users/verify-otp', { email, otp: enteredOtp, username, password, latitude, longitude, role });
            const { token } = response.data;

            if (token) {
                localStorage.setItem('token', token);
                dispatch(loginSuccess({ token }));
                toast.success('Signed up successfully!');
                setTimeout(() => (window.location.href = '/'), 2000);
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (err: any) {
            if (err.response?.status === 410) {
                toast.error('OTP expired. Please request a new one.');
            } else {
                setError('Error verifying OTP. Please try again.');
            }
        }
    };

    const handleResendOtp = async () => {
        try {
            await axios.post('/api/users/resend-otp', { email });

            // Reset state for OTP expiration and button
            setTimer(30); // Restart timer
            setIsResendDisabled(true); // Disable resend button
            setIsOtpExpired(false); // Reset OTP expiration
            setOtp(new Array(4).fill('')); // Clear input fields

            toast.success('OTP resent successfully! OTP will expire in 30 seconds.');
        } catch (err) {
            setError('Error resending OTP. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 relative">
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white focus:outline-none"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold text-center text-green-500 mb-6">OTP VERIFICATION</h2>
                <div className="flex justify-center gap-2 mb-4">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            id={`otp-input-${index}`}
                            className="w-12 h-12 text-center text-xl border-2 border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                            type="text"
                            maxLength={1}
                            value={value}
                            onChange={(e) => handleChange(e.target, index)}
                        />
                    ))}
                </div>
                <p className="text-center text-sm text-gray-400 mb-4">
                    Didn't get the code?{' '}
                    <button
                        onClick={handleResendOtp}
                        disabled={isResendDisabled}
                        className="text-green-500 underline disabled:opacity-50"
                    >
                        Resend
                    </button>
                </p>
                {timer > 0 && <p className="text-center text-gray-400 text-sm mb-4">Resend OTP in {timer} seconds</p>}
                {error && <p className="text-center text-red-500 text-sm mb-4">{error}</p>}
                <button
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                    onClick={handleOtpSubmit}
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default OtpModal;
