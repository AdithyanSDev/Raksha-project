import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Footer from './Footer';
import Header from './Header';
import { registerVolunteerService } from '../../src/services/volunteerService';

interface Location {
    latitude: number;
    longitude: number;
}

const VolunteerRegistration: React.FC = () => {
    const [role, setRole] = useState<string>('');
    const [skills, setSkills] = useState<string[]>([]);
    const [experience, setExperience] = useState<number>(0);
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Retrieve userId from Redux state
    const userId = useSelector((state: RootState) => state.auth.userId);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                (error: any) => {
                    setError('Unable to fetch location');
                }
            );
        } else {
            setError('Geolocation not supported');
        }
    }, []);

    const handleRegisterVolunteer = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Check if user is logged in
        if (!userId) {
            setError('You must be logged in to register as a volunteer.');
            setLoading(false);
            return;
        }

        if (!location) {
            setError('Location data is required');
            setLoading(false);
            return;
        }

        const payload = {
            userId, // Use userId from Redux state
            role,
            skills,
            experience,
            location,
        };

        try {
            const data = await registerVolunteerService(payload);
            console.log('Volunteer registered:', data);
            setLoading(false);
        } catch (error) {
            setError('Error registering volunteer');
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Volunteer Registration</h2>

                {error && <p className="text-red-600 mb-4">{error}</p>}

                <form onSubmit={handleRegisterVolunteer}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select a role</option>
                            <option value="Search & Rescue">
                                Search & Rescue (Individuals skilled in search operations)
                            </option>
                            <option value="Logistics & Supplies">
                                Logistics & Supplies (People helping with delivering goods or managing resources)
                            </option>
                            <option value="Communication">
                                Communication (Volunteers coordinating efforts and communication with authorities)
                            </option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Skills</label>
                        <input
                            type="text"
                            placeholder="Enter comma-separated skills"
                            value={skills.join(', ')}
                            onChange={(e) =>
                                setSkills(e.target.value.split(',').map((skill) => skill.trim()))
                            }
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
                        <input
                            type="number"
                            value={experience}
                            onChange={(e) => setExperience(Number(e.target.value))}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {location ? (
                        <div className="mb-4">
                            <p className="text-sm text-green-600">
                                Location captured: {location.latitude}, {location.longitude}
                            </p>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-600">Fetching location...</p>
                    )}

                    <button
                        type="submit"
                        className="mt-6 w-full bg-blue-600 text-white p-2 rounded-md"
                        disabled={loading || !location}
                    >
                        {loading ? 'Registering...' : 'Register as Volunteer'}
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default VolunteerRegistration;
