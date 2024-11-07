import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BannerUpload: React.FC = () => {
    const [bannerImage, setBannerImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleBannerUpload = async () => {
        if (!bannerImage) return;

        const formData = new FormData();
        formData.append('bannerImage', bannerImage);

        try {
            await axios.post('/api/admin/upload-banner', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Show success notification and reset preview
            toast.success('Banner uploaded successfully!');
            setBannerImage(null);
            setPreviewImage(null);
        } catch (error) {
            toast.error('Error uploading banner');
        }
    };

    const handleFileSelect = (file: File) => {
        setBannerImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col items-center justify-center p-8 w-4/5">
                <h1 className="text-3xl font-bold mb-4">Upload Banner</h1>

                {/* Upload Box */}
                <div
                    className="w-full h-64 border-2 border-dashed border-gray-400 flex flex-col justify-center items-center bg-gray-800 text-white"
                    onClick={() => document.getElementById('fileInput')?.click()}
                    style={{ cursor: 'pointer' }}
                >
                    {!previewImage ? (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 mb-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            <p>Drag and drop or click to select file</p>
                        </>
                    ) : (
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-full object-contain"
                        />
                    )}
                </div>

                {/* Hidden File Input */}
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                    className="hidden"
                />

                {/* Upload Button */}
                {previewImage && (
                    <button
                        onClick={handleBannerUpload}
                        className="bg-green-500 text-white p-3 rounded-lg mt-4"
                    >
                        Upload Banner
                    </button>
                )}

                {/* Custom Notification */}
                <ToastContainer />
            </div>
        </div>
    );
};

export default BannerUpload;
