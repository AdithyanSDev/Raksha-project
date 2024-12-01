import React from 'react';
import { FaSnowflake, FaHandsHelping, FaPhoneAlt, FaHeart } from 'react-icons/fa';

const DisasterBanner: React.FC = () => {
  return (
    <section className="py-8 bg-gray-100 mt-5">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Supporting Communities During Disasters
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {/* Icon 1 */}
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 flex justify-center items-center bg-gray-200 rounded-full">
              <FaSnowflake className="text-blue-500 h-8 w-8" />
            </div>
            <p className="mt-4 text-gray-700 text-sm font-medium">
              Weather Alerts
            </p>
          </div>
          {/* Icon 2 */}
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 flex justify-center items-center bg-gray-200 rounded-full">
              <FaHandsHelping className="text-green-500 h-8 w-8" />
            </div>
            <p className="mt-4 text-gray-700 text-sm font-medium">
             Volunteering Opportunities
            </p>
          </div>
          {/* Icon 3 */}
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 flex justify-center items-center bg-gray-200 rounded-full">
              <FaPhoneAlt className="text-red-500 h-8 w-8" />
            </div>
            <p className="mt-4 text-gray-700 text-sm font-medium">
              Emergency Support
            </p>
          </div>
          {/* Icon 4 */}
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 flex justify-center items-center bg-gray-200 rounded-full">
              <FaHeart className="text-pink-500 h-8 w-8" />
            </div>
            <p className="mt-4 text-gray-700 text-sm font-medium">
              Providing Relief
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisasterBanner;
