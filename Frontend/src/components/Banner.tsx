import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Banner: React.FC = () => {
    const [bannerUrl, setBannerUrl] = useState('');

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await axios.get('/api/admin/banner');
                setBannerUrl(response.data.imageUrl);
            } catch (error) {
                console.error('Error fetching banner:', error);
            }
        };
        fetchBanner();
    }, []);

    return (
        <div 
            className="relative bg-cover bg-center h-[300px] sm:h-[400px] md:h-[500px] lg:h-screen transition-all ease-in-out duration-500" 
            style={{ backgroundImage: `url(${bannerUrl})` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {/* Add your heading text here */}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    {/* Add your paragraph text here */}
                </p>
            </div>
        </div>
    );
};

export default Banner;
