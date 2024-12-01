import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkVolunteerStatus } from '../services/volunteerService';
import { RootState } from '../redux/store';

const VolunteerSection: React.FC = () => {
    const navigate = useNavigate();
    const [isUserVolunteer, setIsUserVolunteer] = useState(false);

    // Get userId from Redux store
    const userId = useSelector((state: RootState) => state.auth.userId);

    const handleNavigateToForm = () => {
        navigate('/volunteer-register');
    };

    const handleNavigateToVolunteerSection = () => {
        navigate('/profile');
    };

    useEffect(() => {
        const verifyVolunteerStatus = async () => {
            if (userId) {
                try {
                    const isVolunteer = await checkVolunteerStatus(userId);
                    setIsUserVolunteer(isVolunteer);
                
                } catch (error) {
                    console.error('Error checking volunteer status:', error);
                }
            }
        };

        verifyVolunteerStatus();
    }, [userId]);

    return (
        <section className="bg-gray-900 text-white px-4 py-8 my-6 md:px-16 lg:px-32 animate-slide-in mb-1">
            <h2 className="text-3xl font-bold mb-4">Volunteer Section</h2>
            <p className="mb-6">
                Learn more about how to volunteer during crises and contribute to the community.
            </p>

            {/* Conditionally render button based on volunteer status */}
            {!isUserVolunteer ? (
                <button
                    onClick={handleNavigateToForm}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-all"
                >
                    Become a Volunteer
                </button>
            ) : (
                <button
                    onClick={handleNavigateToVolunteerSection}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-all"
                >
                    Go to Volunteer Section
                </button>
            )}
        </section>
    );
};

export default VolunteerSection;
