import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import MaterialDonationForm from '../components/MaterialDonationForm';
import MonetaryDonationForm from '../components/MonetaryDonationForm';
import Footer from '../components/Footer';
import picture from '../images/donation.avif';

const DonationPage: React.FC = () => {
    const [activeForm, setActiveForm] = useState<'material' | 'monetary' | null>(null);

    return (
      <div>
      {/* Simple Header */}
<header className="bg-green-800 text-white py-4 text-3xl font-bold w-full">
    <Link to="/" className="hover:underline ml-4">Raksha</Link>
</header>
      

        <div className="flex flex-col items-center py-9">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center justify-center w-full bg-cover bg-center p-8 rounded-t-lg shadow-sm border-t-4 border-gray-300" style={{ backgroundImage: "url('/images/new-donation-bg.jpg')" }}>
                {/* Text Section */}
                <div className="lg:w-1/2 text-center lg:text-left px-8 py-4 space-y-4">
                    <h1 className="text-gray-900 text-4xl font-extrabold">Make a Difference</h1>
                    <p className="text-gray-700 text-lg">Your contribution can bring hope and support to those in need. Together, let’s create a positive impact.</p>
                </div>

                {/* Image Section */}
                <div className="lg:w-1/2 p-4">
                    <img src={picture} alt="Donation Support" className="w-full rounded-lg shadow-lg" />
                </div>
            </div>

            {/* Donation Section */}
            <div className="bg-white py-8 rounded-b-lg shadow-sm w-full max-w-5xl">
                <div className="text-center mb-6 px-4">
                    <h2 className="text-3xl font-bold text-gray-900">Choose Your Way to Help</h2>
                    <p className="text-gray-600">You can support by donating materials or funds. Every contribution matters.</p>
                </div>

                {/* Donation Type Buttons */}
                <div className="flex justify-center space-x-4 mb-8">
                    <button
                        className={`px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all ${activeForm === 'material' ? 'ring-4 ring-green-400' : ''}`}
                        onClick={() => setActiveForm('material')}
                    >
                        Material Donation
                    </button>
                    <button
                        className={`px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all ${activeForm === 'monetary' ? 'ring-4 ring-blue-400' : ''}`}
                        onClick={() => setActiveForm('monetary')}
                    >
                        Monetary Donation
                    </button>
                </div>

                {/* Donation Forms */}
                <div className="flex justify-center">
                    <div className="mt-6 w-full max-w-3xl p-6 bg-white bg-opacity-90 rounded-lg shadow-xl">
                        {activeForm === 'material' && <MaterialDonationForm />}
                        {activeForm === 'monetary' && <MonetaryDonationForm />}
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
};

export default DonationPage;
