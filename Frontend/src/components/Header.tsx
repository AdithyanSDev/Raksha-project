import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiBell, FiUser } from 'react-icons/fi';
import { useSelector, useDispatch } from "react-redux";
import {  useNavigate } from 'react-router-dom'; // Import useNavigate
import { RootState } from '../redux/store'; 
import LoginModal from './Login';
import SignupModal from './Signup';
import { logout } from '../features/auth/authSlice'; // Import logout action

const Header: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState<'login' | 'signup' | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    const authState = useSelector((state: RootState) => state.auth);

    console.log("Auth State:", authState.userId);
    
    const handleProfileClick = () => {
        setShowDropdown(prevState => !prevState);
    };

    const handleLogout = () => {
        dispatch(logout()); // Dispatch logout action
        setShowDropdown(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowDropdown(false);
        }
    };

    const navigateToProfile = () => {
        navigate('/profile'); // Navigate to the profile page
        setShowDropdown(false);
    };
    const navigateToDonation=()=>{
        navigate('/donation-page')
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <header className="bg-green-800 p-4 flex justify-between items-center">
            <div className="text-white font-bold text-2xl">Raksha</div>
            <nav className="flex space-x-6">
                <a href="/" className="text-white hover:underline">Home</a>
                <a href="/alerts" className="text-white hover:underline">Alerts</a>
                <a href="/resources" className="text-white hover:underline">Resources</a>
                <a href="/map" className="text-white hover:underline">Map</a>
                <a href="/contact" className="text-white hover:underline">Contact Us</a>
            </nav>
            <div className="flex items-center bg-white rounded-full px-4 py-1">
                <input type="text" className="outline-none w-full" placeholder="Search..." />
                <FiSearch className="text-green-800 ml-2" />
            </div>
            <div className="flex items-center space-x-6 text-white">
                <FiBell className="text-2xl cursor-pointer" />
                <div className="relative" ref={dropdownRef}>
                    <FiUser className="text-2xl cursor-pointer" onClick={handleProfileClick} />
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg py-2 z-50">
                            {!authState.isAuthenticated ? (
                                <button onClick={() => setShowModal('login')} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-left">Login</button>
                            ) : (
                                <>
                                    <button onClick={navigateToProfile} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-left">Profile</button>
                                    <button onClick={handleLogout} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-left">Logout</button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700" onClick={navigateToDonation}>Donate Now</button>

            {/* Conditional rendering of modals */}
            {showModal === 'login' && <LoginModal closeModal={setShowModal} />}
            {showModal === 'signup' && <SignupModal closeModal={() => setShowModal(null)} />}
        </header>
    );
};

export default Header;
