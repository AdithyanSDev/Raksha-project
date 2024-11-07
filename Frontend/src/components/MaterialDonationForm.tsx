import React, { useState } from 'react';
import { createMaterialDonation } from '../services/donationService';

const MaterialDonationForm: React.FC = () => {
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState<number | ''>('');
    const [images, setImages] = useState<File[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setImages(filesArray);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!itemName || !quantity) return;

        try {
            const formData = new FormData();
            formData.append('itemName', itemName);
            formData.append('quantity', quantity.toString());
            images.forEach((image) => formData.append('materialImages', image)); // Append using "materialImages"

            await createMaterialDonation(formData);
            alert('Material donation created successfully!');
            setItemName('');
            setQuantity('');
            setImages([]);
        } catch (error: any) {
            alert('Error creating donation: ' + error.message);
        }
    };

    const previewImages = images.map((file, index) => (
        <img
            key={index}
            src={URL.createObjectURL(file)}
            alt="preview"
            className="w-32 h-32 object-cover rounded-md mx-2 my-2"
        />
    ));

    return (
        <form className="bg-white p-8 rounded-xl shadow-md space-y-6 max-w-full mx-auto" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-center mb-6">Donate Materials</h2>
            <p className="text-gray-600 text-center mb-6">Contribute physical items to help those in need.</p>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                <select
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500"
                >
                    <option value="">Select an item</option>
                    <option value="clothes">Clothes</option>
                    <option value="medicines">Medicines</option>
                    <option value="household">Household Materials</option>
                    {/* Add more options as needed */}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value ? parseInt(e.target.value) : '')}
                    className="w-full p-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500"
                    placeholder="Enter the quantity"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
                <input
                    type="file"
                    name="materialImages"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-4 border border-gray-300 rounded-full"
                />
                <div className="flex flex-wrap mt-4">{previewImages}</div>
            </div>
            
            <button type="submit" className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all shadow-lg">
                Submit Material Donation
            </button>
        </form>
    );
};

export default MaterialDonationForm;
