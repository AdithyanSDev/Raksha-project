import React from "react";

interface ProfileFormProps {
  formData: any;
  onChange: (e: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  errors: any;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  formData,
  onChange,
  onSubmit,
  errors,
  isEditing,
  setIsEditing,
}) => {
  return (
    <div className="flex flex-col min-h-screen   ">
      
      <div className="flex-grow m-4 bg-gradient-to-r from-purple-100 to-green-100 p-8 rounded-md shadow-lg transform transition-transform hover:scale-95 mx-4 my-1">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Profile Form</h2>
        {!isEditing ? (
          <div className="space-y-4">
            <p>
              <strong>Username:</strong> {formData.username || "Not provided"}
            </p>
            <p>
              <strong>Email:</strong> {formData.email || "Not provided"}
            </p>
            <p>
              <strong>Gender:</strong> {formData.gender || "Not provided"}
            </p>
            <p>
              <strong>Age:</strong> {formData.age || "Not provided"}
            </p>
            <p>
              <strong>Phone Number:</strong> {formData.phoneNumber || "Not provided"}
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-gray-600">Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={onChange}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.username && <p className="text-red-500">{errors.username}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-gray-600">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-gray-600">Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={onChange}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-600">Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={onChange}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.age && <p className="text-red-500">{errors.age}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-gray-600">Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChange}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition transform hover:scale-105"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition transform hover:scale-105"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
