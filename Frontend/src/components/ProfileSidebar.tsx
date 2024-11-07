import { FaCamera } from "react-icons/fa";

interface ProfileSidebarProps {
  username: string;
  profilePicture: string;
  onOpenModal: () => void;
  onLogout: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ username, profilePicture, onOpenModal, onLogout }) => {
  return (
    <aside className="w-full lg:w-1/4 bg-gray-100 p-6">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gray-300 rounded-full relative">
          {profilePicture && (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          )}
          <button
            className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full"
            onClick={onOpenModal}
          >
            <FaCamera />
          </button>
        </div>
        <div className="ml-4">
          <p className="text-lg font-semibold">Hi {username || "username"}</p>
        </div>
      </div>
      <nav className="space-y-4">
      <a
          href="#"
          className="block text-gray-700 hover:bg-gray-200 p-2 rounded-md"
        >
          Personal information
        </a>
        <a
          href="#"
          className="block text-gray-700 hover:bg-gray-200 p-2 rounded-md"
        >
          User activity and history
        </a>
        <a
          href="#"
          className="block text-gray-700 hover:bg-gray-200 p-2 rounded-md"
        >
          Notification and alerts
        </a>
        <a
          href="#"
          className="block text-gray-700 hover:bg-gray-200 p-2 rounded-md"
        >
          Security and privacy settings
        </a>
        <a
          href="#"
          className="block text-gray-700 hover:bg-gray-200 p-2 rounded-md"
        >
          Resource contributions
        </a>
        <a
          href="#"
          className="block text-gray-700 hover:bg-gray-200 p-2 rounded-md"
        >
          Volunteering opportunities
        </a>

        <a className="block text-gray-700 hover:bg-gray-200 p-2 rounded-md"   onClick={onLogout}>
          Logout
        </a>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
