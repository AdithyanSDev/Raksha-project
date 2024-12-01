import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiBell, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store'; 
import LoginModal from './Login';
import SignupModal from './Signup';
import { logout } from '../features/auth/authSlice';

const Header: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showModal, setShowModal] = useState<'login' | 'signup' | null>(null);
    const [isScrolled, setIsScrolled] = useState(false); 
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authState = useSelector((state: RootState) => state.auth);

    const handleProfileClick = () => {
        setShowDropdown(prevState => !prevState);
    };

    const handleLogout = () => {
        dispatch(logout());
        setShowDropdown(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowDropdown(false);
        }
    };

    const navigateToProfile = () => {
        navigate('/profile');
        setShowDropdown(false);
    };

    const navigateToDonation = () => {
        navigate('/donation-page');
    };

    const navigateToChat = () => {
        navigate("/chat");
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-20 p-4 flex justify-between items-center transition-all duration-300 ${
                isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
            }`}
        >
            <div className={`font-bold text-2xl ${isScrolled ? 'text-gray-900' : 'text-white'} cursor-pointer`} onClick={()=>{navigate('/')}}>
                Raksha
            </div>
            {/* Hamburger Menu for Small Devices */}
            <div className="md:hidden">
                {showMobileMenu ? (
                    <FiX
                        className={`text-3xl ${isScrolled ? 'text-gray-900' : 'text-white'} cursor-pointer`}
                        onClick={() => setShowMobileMenu(false)}
                    />
                ) : (
                    <FiMenu
                        className={`text-3xl ${isScrolled ? 'text-gray-900' : 'text-white'} cursor-pointer`}
                        onClick={() => setShowMobileMenu(true)}
                    />
                )}
            </div>
            {/* Desktop Navigation */}
            <nav className={`hidden md:flex space-x-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                <a href="/" className="hover:underline">Home</a>
                <a href="/alertpage" className="hover:underline">Alerts</a>
                <a href="/resources" className="hover:underline">Resources</a>
                <a href="/map" className="hover:underline">Map</a>
                <a onClick={navigateToChat} className="hover:underline cursor-pointer">Contact Us</a>
            </nav>
            {/* Mobile Navigation */}
            {showMobileMenu && (
                <nav className="absolute top-16 left-0 w-full bg-white shadow-lg z-30 flex flex-col space-y-4 py-4 px-6 md:hidden">
                    <a href="/" className="hover:underline">Home</a>
                    <a href="/alerts" className="hover:underline">Alerts</a>
                    <a href="/resources" className="hover:underline">Resources</a>
                    <a href="/map" className="hover:underline">Map</a>
                    <a onClick={navigateToChat} className="hover:underline cursor-pointer">Contact Us</a>
                </nav>
            )}
            <div className="hidden md:flex items-center bg-white rounded-full px-4 py-1">
                <input type="text" className="outline-none w-full" placeholder="Search..." />
                <FiSearch className="text-green-800 ml-2" />
            </div>
            <div className={`hidden md:flex items-center space-x-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
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
            <button className="hidden md:block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700" onClick={navigateToDonation}>Donate Now</button>
            {showModal === 'login' && <LoginModal closeModal={setShowModal} />}
            {showModal === 'signup' && <SignupModal closeModal={() => setShowModal(null)} />}
        </header>
    );
};

export default Header;
