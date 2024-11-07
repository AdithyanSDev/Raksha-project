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
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-6 rounded-md">
          <h3 className="text-lg font-semibold mb-4">Change Profile Picture</h3>
          <div className="space-y-4">
            <button onClick={onTakePicture} className="p-2 bg-blue-600 text-white rounded-md">
              Take Picture
            </button>
            <button onClick={onSelectFromGallery} className="p-2 bg-gray-600 text-white rounded-md">
              Select from Gallery
            </button>
            <button onClick={onClose} className="p-2 bg-red-600 text-white rounded-md">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfilePictureModal;
  