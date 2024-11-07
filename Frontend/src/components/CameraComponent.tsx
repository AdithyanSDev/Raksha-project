import React, { useRef } from "react";
import Webcam from "react-webcam";

interface CameraComponentProps {
  onPictureCapture: (picture: string) => void; // Update the prop name
  onClose: () => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ onPictureCapture, onClose }) => {
  const webcamRef = useRef<Webcam>(null);
  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onPictureCapture(imageSrc); // Updated to match the prop
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md flex flex-col items-center">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "user" }}
          className="mb-4 w-80 h-60 rounded-md"
        />
        <div className="flex space-x-4">
          <button
            onClick={capture}
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Capture
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraComponent;

