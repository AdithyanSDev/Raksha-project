import { useState } from "react";
import { FaCamera, FaImages, FaTimes } from "react-icons/fa";
import CameraComponent from "./CameraComponent"; // Assuming CameraComponent is in the same folder

interface ProfilePictureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTakePicture: () => void;
  onSelectFromGallery: () => void;
}

const ProfilePictureModal: React.FC<ProfilePictureModalProps> = ({
  isOpen,
  onClose,
  onTakePicture,
  onSelectFromGallery,
}) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleTakePicture = () => {
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fade-in">
      <div className="relative w-96 bg-white rounded-lg shadow-lg overflow-hidden animate-slide-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* Camera Component */}
        {isCameraOpen ? (
          <CameraComponent onClose={handleCloseCamera} onPictureCapture={onTakePicture} />
        ) : (
          <div className="p-6 flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Change Profile Picture</h3>

            <div className="w-full flex flex-col gap-4">
              {/* Take Picture */}
              <button
                onClick={handleTakePicture}
                className="flex items-center gap-3 justify-center w-full p-3 bg-gray-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                <FaCamera className="text-lg" />
                Take Picture
              </button>

              {/* Select from Gallery */}
              <button
                onClick={onSelectFromGallery}
                className="flex items-center gap-3 justify-center w-full p-3 bg-green-300 text-white rounded-lg shadow hover:bg-gray-700 transition"
              >
                <FaImages className="text-lg" />
                Select from Gallery
              </button>
            </div>

            {/* Cancel */}
            <button
              onClick={onClose}
              className="mt-6 w-full p-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePictureModal;
