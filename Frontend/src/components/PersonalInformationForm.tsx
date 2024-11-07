import React from 'react';

interface PersonalInformationFormProps {
    personalInfo: { firstName: string; lastName: string; email: string; phone: string };
    billingInfo: { address: string; city: string; postalCode: string; country: string };
    cardInfo: { cardNumber: string; expiryDate: string; cvv: string };
    setPersonalInfo: (info: any) => void;
    setBillingInfo: (info: any) => void;
    setCardInfo: (info: any) => void;
    handleDonationSubmit: () => void;
    handlePrevious: () => void;
}

const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({
    personalInfo,
    billingInfo,
    cardInfo,
    setPersonalInfo,
    setBillingInfo,
    setCardInfo,
    handleDonationSubmit,
    handlePrevious,
}) => {
    return (
        <div>
            <h2 className="text-xl font-semibold text-center mb-4">Personal Information</h2>
            {/* Personal Information Fields */}
            <input
                type="text"
                placeholder="First Name"
                value={personalInfo.firstName}
                onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                className="w-full p-2 border rounded-lg mb-3"
            />
            <input
                type="text"
                placeholder="Last Name"
                value={personalInfo.lastName}
                onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                className="w-full p-2 border rounded-lg mb-3"
            />
            <input
                type="email"
                placeholder="Email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                className="w-full p-2 border rounded-lg mb-3"
            />
            <input
                type="text"
                placeholder="Phone"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                className="w-full p-2 border rounded-lg mb-3"
            />

            {/* Billing Information */}
            <h2 className="text-xl font-semibold text-center mb-4 mt-6">Billing Information</h2>
            <input
                type="text"
                placeholder="Address"
                value={billingInfo.address}
                onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
                className="w-full p-2 border rounded-lg mb-3"
            />
            <input
                type="text"
                placeholder="City"
                value={billingInfo.city}
                onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
                className="w-full p-2 border rounded-lg mb-3"
            />
            <input
                type="text"
                placeholder="Postal Code"
                value={billingInfo.postalCode}
                onChange={(e) => setBillingInfo({ ...billingInfo, postalCode: e.target.value })}
                className="w-full p-2 border rounded-lg mb-3"
            />
            <input
                type="text"
                placeholder="Country"
                value={billingInfo.country}
                onChange={(e) => setBillingInfo({ ...billingInfo, country: e.target.value })}
                className="w-full p-2 border rounded-lg mb-3"
            />

            {/* Card Information */}
            <h2 className="text-xl font-semibold text-center mb-4 mt-6">Card Information</h2>
            <input
                type="text"
                placeholder="Card Number"
                value={cardInfo.cardNumber}
                onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
                className="w-full p-2 border rounded-lg mb-3"
            />
            <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                value={cardInfo.expiryDate}
                onChange={(e) => setCardInfo({ ...cardInfo, expiryDate: e.target.value })}
                className="w-full p-2 border rounded-lg mb-3"
            />
            <input
                type="text"
                placeholder="CVV"
                value={cardInfo.cvv}
                onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                className="w-full p-2 border rounded-lg mb-3"
            />

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={handlePrevious}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                    Previous
                </button>
                <button
                    onClick={handleDonationSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Donate Now
                </button>
            </div>
        </div>
    );
};

export default PersonalInformationForm;
