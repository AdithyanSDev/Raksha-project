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
        <div className="relative bg-cover bg-center h-[500px]" style={{ backgroundImage: `url(${bannerUrl })` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white">
                <h1 className="text-5xl font-bold mb-4">Stand with Wayanad</h1>
                <p className="text-2xl">How can you help those in Wayanad?</p>
            </div>
        </div>
    );
};

export default Banner;
