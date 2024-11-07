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
    <div className="w-full lg:w-3/4 p-6">
      <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
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
            className="mt-4 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-gray-600">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-md"
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
              className="w-full p-2 border border-gray-300 rounded-md"
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
              className="w-full p-2 border border-gray-300 rounded-md"
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
              className="w-full p-2 border border-gray-300 rounded-md"
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
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
          </div>

          <button
            type="submit"
            className="mt-4 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
          <button
            type="button"
            className="mt-4 p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfileForm;
