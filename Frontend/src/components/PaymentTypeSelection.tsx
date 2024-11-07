import React from 'react';

interface PaymentTypeSelectionProps {
    paymentMethod: 'creditCard' | 'upi' | null;
    setPaymentMethod: (method: 'creditCard' | 'upi' | null) => void;
    handleNext: () => void;
    handlePrevious: () => void;
    handleUPIDonation: () => void;
}

const PaymentTypeSelection: React.FC<PaymentTypeSelectionProps> = ({ paymentMethod, setPaymentMethod, handleNext, handlePrevious, handleUPIDonation }) => {
    return (    
        <div>
            <h2 className="text-xl font-semibold text-center mb-4">Payment Type</h2>
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => setPaymentMethod('creditCard')}
                    className={`w-1/2 p-4 border rounded-lg ${paymentMethod === 'creditCard' ? 'border-blue-600' : 'border-gray-300'}`}
                >
                    <i className="fas fa-credit-card"></i> Credit Card
                </button>
                <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`w-1/2 p-4 border rounded-lg ${paymentMethod === 'upi' ? 'border-blue-600' : 'border-gray-300'}`}
                >
                    <i className="fas fa-university"></i> UPI
                </button>
            </div>
            {paymentMethod === 'creditCard' && (
                <button onClick={handleNext} className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all mt-6">
                    Continue with Credit Card
                </button>
            )}
            {paymentMethod === 'upi' && (
                <button onClick={handleUPIDonation} className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all mt-6">
                    Proceed with UPI
                </button>
            )}
            <button className="w-full py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-all mt-4" onClick={handlePrevious}>
                Back
            </button>
        </div>
    );
};

export default PaymentTypeSelection;
