import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { checkVolunteerStatus, fetchVolunteerDataByUserId } from "../services/volunteerService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface ProfileSidebarProps {
  username: string;
  profilePicture: string;
  onOpenModal: () => void;
  onLogout: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  username,
  profilePicture,
  onOpenModal,
  onLogout,
}) => {
  const [isVolunteer, setIsVolunteer] = useState<boolean>(false);
  const [volunteerId, setVolunteerId] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState<string>(""); // Track active link
  const userId = useSelector((state: any) => state.auth.userId);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVolunteerStatusAndId = async () => {
      if (userId) {
        try {
          const status = await checkVolunteerStatus(userId);
          setIsVolunteer(status);
          if (status) {
            const volunteerData = await fetchVolunteerDataByUserId(userId);
            setVolunteerId(volunteerData._id || null);
          }
        } catch (error) {
          console.error("Failed to fetch volunteer status or ID:", error);
        }
      }
    };
    fetchVolunteerStatusAndId();
  }, [userId]);

  const handleVolunteerClick = () => {
    if (isVolunteer && volunteerId) {
      navigate(`/volunteer/profile/${volunteerId}`);
      setActiveLink("Volunteer Section");
    } else {
      navigate("/volunteer-register");
      setActiveLink("Volunteering Opportunities");
    }
  };

  return (
    <aside className="w-full rounded-xl  lg:w-1/4 bg-gradient-to-br from-purple-300 to-blue-200 p-6 shadow-lg relative overflow-hidden mx-2 my-5">
      {/* Glowing Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-500 opacity-20 blur-3xl"></div>
      </div>

      {/* Profile Section */}
      <div className="flex items-center mb-6 relative z-10">
        <div className="w-16 h-16 bg-gray-700 rounded-full relative overflow-hidden">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl">
              <FaCamera />
            </div>
          )}
          <button
            className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-all"
            onClick={onOpenModal}
          >
            <FaCamera />
          </button>
        </div>
        <div className="ml-4">
          <p className="text-xl font-semibold text-white">Hi {username || "User"}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-4 relative z-10">
        {[
          { label: "Personal Information", route: "/profile" },
          { label: "User Activity and History", route: "#" },
          { label: "Notification and Alerts", route: "/alertpage" },
          { label: "Security and Privacy Settings", route: "#" },
          { label: "Resource Contributions", route: "#" },
        ].map((item) => (
          <a
            key={item.label}
            onClick={() => {
              navigate(item.route);
              setActiveLink(item.label);
            }}
            className={`block text-lg px-4 py-2 transition-all cursor-pointer ${
              activeLink === item.label
                ? "bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold"
                : "text-black hover:bg-gray-700 hover:text-white"
            }`}
          >
            {item.label}
          </a>
        ))}

        <a
          onClick={handleVolunteerClick}
          className={`block text-lg px-4 py-2 transition-all cursor-pointer ${
            activeLink === (isVolunteer ? "Volunteer Section" : "Volunteering Opportunities")
              ? "bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold"
              : "text-black hover:bg-gray-700 hover:text-white"
          }`}
        >
          {isVolunteer ? "Volunteer Section" : "Volunteering Opportunities"}
        </a>

        <a
          onClick={onLogout}
          className="block text-lg text-red-600 px-4 py-2 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
        >
          Logout
        </a>
      </nav>  
    </aside>
  );
};

export default ProfileSidebar;
