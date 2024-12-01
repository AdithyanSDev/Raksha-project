// components/CancelModal.tsx
import React, { useState } from 'react';

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const CancelModal: React.FC<CancelModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!reason.trim()) {
      alert('Please provide a reason for cancellation.');
      return;
    }
    onSubmit(reason);
    setReason('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Cancel Donation</h2>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter the reason for canceling the donation"
          className="w-full border border-gray-300 rounded p-2 mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Close
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-red-500 text-white rounded">
            Cancel Donation
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
