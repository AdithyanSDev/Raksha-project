import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../features/user/userSlice";
import { AppDispatch } from "../redux/store";
import CameraComponent from "./CameraComponent";
import ProfilePictureModal from "./ProfilePictureModal";
import { logout } from "../features/auth/authSlice";
import Footer from "./Footer";
import ProfileForm from "./EditProfileForm";
import { updateUserProfile, uploadProfilePictureToS3 } from "../services/UserService";
import ProfileSidebar from "./ProfileSidebar"; // New Sidebar Component
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { profile } = useSelector((state: any) => state.user);


  const [formData, setFormData] = useState({
    username: "",
    email: "",
    gender: "",
    age: 0,
    phoneNumber: "",
    profilePicture: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    age: "",
    phoneNumber: "",
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({ ...formData, ...profile });
    }
  }, [profile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      uploadImage(file);
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    let errors: any = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email address.";
      isValid = false;
    }

    if (formData.age > 100) {
      errors.age = "Age should not exceed 100.";
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone number must be 10 digits.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handlePictureCapture = async (picture: string) => {
    const file = await base64ToFile(picture);
    await uploadImage(file);
    setIsCameraOpen(false);
  };

  const uploadImage = async (file: File) => {
    try {
      const response = await uploadProfilePictureToS3(file);
      if (response && response.data && response.data.user) {
        const profilePictureUrl = response.data.user.profilePicture;

        setFormData({
          ...formData,
          profilePicture: profilePictureUrl,
        });

        await updateUserProfile({ ...formData, profilePicture: profilePictureUrl });
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await updateUserProfile(formData);
      dispatch(fetchUserProfile());
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const takePicture = () => {
    setIsCameraOpen(true);
    closeModal();
  };
  const selectFromGallery = () => {
    document.getElementById("file-input")?.click();
    closeModal();
  };

  const base64ToFile = async (base64: string): Promise<File> => {
    const response = await fetch(base64);
    const blob = await response.blob();
    return new File([blob], "profile-picture.jpg", { type: "image/jpeg" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-100 to-blue-100">
      <header className="bg-transparent text-green-500 py-4 text-3xl font-bold w-full">
        <Link to="/" className="hover:underline ml-4">Raksha</Link>
      </header>
      <div className="flex flex-col lg:flex-row flex-grow">
        {/* Sidebar */}
        <ProfileSidebar
          username={formData.username}
          profilePicture={formData.profilePicture}
          onOpenModal={openModal}
          onLogout={handleLogout}
        />

        {/* Main Content */}
        <main className="flex-grow p-6 bg-gradient-to-r from-blue-100 to-green-200">
          {isEditing ? (
            <ProfileForm
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onSubmit={handleSubmit}
              isEditing={isEditing}

              setIsEditing={setIsEditing}
            />
          ) : (
            <div className="bg-gradient-to-r from-green-100 to-purple-100 p-6 rounded-md shadow-lg transform transition-transform hover:scale-95">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Personal Information</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-gray-700">
                <p><strong>Username:</strong> {formData.username}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Gender:</strong> {formData.gender}</p>
                <p><strong>Age:</strong> {formData.age}</p>
                <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
              </div>
              <button
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                onClick={() => setIsEditing(true)}
              >
                Edit Information
              </button>
            </div>
          )}
        </main>
      </div>
      <Footer />

      <ProfilePictureModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onTakePicture={takePicture}
        onSelectFromGallery={selectFromGallery}
      />
      {isCameraOpen && <CameraComponent onPictureCapture={handlePictureCapture} onClose={closeModal} />}

      <input
        type="file"
        id="file-input"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProfilePage;
  