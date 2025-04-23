import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Footer from './Footer';
import { registerVolunteerService } from '../../src/services/volunteerService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import react-toastify

// Add Location interface
interface Location {
    latitude: number;
    longitude: number;
}
interface User {
    phoneNumber?: string;
    location: {
      latitude: number;
      longitude: number;
    };
    // Add other properties of User here
  }

export interface VolunteerData {
   
    _id?: string;
    availabilityStatus?: string;
    profilePicture?: string | undefined;
    name?: string;
    email?: string;
    phone?:string
    userId: string;
    role: string;
    skills: string[];
    experience: number;
    status?: string;
    location: {
        latitude: number;
        longitude: number;
    };
    tasks?:string[]
    user?: User;
}



const VolunteerRegistration: React.FC = () => {
    const [role, setRole] = useState<string>('');
    const [skills, setSkills] = useState<string[]>([]);
    const [experience, setExperience] = useState<number>(0);
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const userId = useSelector((state: RootState) => state.auth.userId);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                () => setError('Unable to fetch location')
            );
        } else {
            setError('Geolocation not supported');
        }
    }, []);

    const handleRegisterVolunteer = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

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
        const payload :VolunteerData= {
            userId,    
            role,      
            skills,    
            experience,
            location,  
            
        };

        try {
            const data = await registerVolunteerService(payload);
            console.log('Volunteer registered:', data);
            setLoading(false);
            // Show success message
            toast.success('Volunteer registration request has been sent to the admin!');
            // Redirect to homepage after the toast message
            setTimeout(() => {
                navigate('/'); // Redirect to the homepage
            }, 3000); // Delay the redirect to allow the toast to show
        } catch {
            setError('Error registering volunteer');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="bg-green-700 text-white py-4 text-3xl font-semibold shadow-md">
                <Link to="/" className="ml-6 hover:underline">
                    Raksha
                </Link>
            </header>
            <main className="flex-grow flex flex-row items-center justify-center p-6 space-x-8">
                {/* Left Side */}
                <div
                    className="w-1/2 flex flex-col items-start p-6 rounded-lg bg-white shadow-lg animate-fadeInLeft"
                >
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Join Our Volunteer Team
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Make a difference by contributing your skills and effort to support
                        communities during emergencies.
                    </p>
                    <img
                        src="src/assets/images/Volunteer.jpeg"
                        alt="Volunteer illustration"
                        className="w-full rounded-lg shadow-md animate-fadeInSlow"
                    />
                </div>

                {/* Right Side */}
                <div className="w-1/2 bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Volunteer Registration
                    </h2>

                    {error && (
                        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegisterVolunteer} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role
                            </label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                                required
                            >
                                <option value="">Select a role</option>
                                <option value="Search & Rescue">
                                    Search & Rescue
                                </option>
                                <option value="Logistics & Supplies">
                                    Logistics & Supplies
                                </option>
                                <option value="Communication">Communication</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Skills
                            </label>
                            <input
                                type="text"
                                placeholder="Enter skills (e.g., First Aid, Driving)"
                                value={skills.join(', ')}
                                onChange={(e) =>
                                    setSkills(
                                        e.target.value.split(',').map((skill) => skill.trim())
                                    )
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Experience (years)
                            </label>
                            <input
                                type="number"
                                value={experience}
                                onChange={(e) => setExperience(Number(e.target.value))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                                required
                            />
                        </div>

                        {location ? (
                            <div className="text-sm text-green-600">
                                Location: {location.latitude}, {location.longitude}
                            </div>
                        ) : (
                            <div className="text-sm text-gray-500">Fetching location...</div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition disabled:bg-gray-400"
                            disabled={loading || !location}
                        >
                            {loading ? 'Registering...' : 'Register as Volunteer'}
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default VolunteerRegistration;
