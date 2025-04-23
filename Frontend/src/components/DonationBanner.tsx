import React, { useEffect, useState } from 'react';
import { fetchMonetaryDonations } from '../services/donationService';
import { useNavigate } from 'react-router-dom';

const DonationBanner: React.FC = () => {
  const [totalDonations, setTotalDonations] = useState(0);
  const navigate=useNavigate()
  useEffect(() => {
    const getTotalDonations = async () => {
      try {
        const donations = await fetchMonetaryDonations();

        const total = donations.reduce((sum: number, donation: { amount: number }) => sum + donation.amount, 0);
        setTotalDonations(total);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    getTotalDonations();
  }, []);

  return (
    <section className="relative bg-gray-100 overflow-hidden h-screen my-5"> {/* Increased height from h-80 to h-96 */}
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://raksha-project.s3.ap-south-1.amazonaws.com/banner-video/6893774-uhd_2560_1440_25fps.mp4" // Replace with the video URL
        autoPlay
        muted
        loop
        style={{
          objectFit: 'cover', // Ensures the video fills the entire section
          height: '100%',     // Matches the section height
          width: '100%',      // Matches the section width
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Overlay to darken the video */}

      {/* Centered Content */}
      <div className="relative flex flex-col justify-center items-center h-full text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Together, We Make a Difference
        </h2>
        <p className="text-xl text-white mb-6">
          Total Donations Collected: <span className="font-bold text-green-400">${totalDonations}</span>
        </p>
        <button
          className="bg-green-500 text-white px-8 py-4 text-lg font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300"
          onClick={() => (navigate('/donation-page'))}
        >
          Be a Part of This
        </button>
      </div>
    </section>
  );
};

export default DonationBanner;
