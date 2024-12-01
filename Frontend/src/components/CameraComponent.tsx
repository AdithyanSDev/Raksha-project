import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { FaCamera, FaTimes } from "react-icons/fa";

interface CameraComponentProps {
  onPictureCapture: (picture: string) => void;
  onClose: () => void; // Ensure onClose is passed to handle closing the camera
}

const CameraComponent: React.FC<CameraComponentProps> = ({
  onPictureCapture,
  onClose,
}) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onPictureCapture(imageSrc);
      }
    }
  };

  const stopCamera = () => {
    if (webcamRef.current && webcamRef.current.video) {
      const stream = webcamRef.current.video.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());
    }
    onClose(); // Call onClose when stopping the camera
  };

  useEffect(() => {
    return () => {
      // Ensure the camera is stopped when the component unmounts
      stopCamera();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in">
      <div className="relative w-96 bg-white rounded-lg shadow-lg overflow-hidden animate-slide-in-up">
        {/* Close Button */}
        <button
          onClick={stopCamera}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* Modal Content */}
        <div className="p-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Capture Your Picture
          </h3>

          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            className="mb-4 w-80 h-60 rounded-md border border-gray-300 shadow-sm"
          />

          <div className="w-full flex justify-center gap-4">
            {/* Capture Button */}
            <button
              onClick={capture}
              className="flex items-center gap-2 justify-center w-full p-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              <FaCamera className="text-lg" />
              Capture
            </button>

            {/* Close Button */}
            <button
              onClick={stopCamera}
              className="w-full p-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraComponent;
