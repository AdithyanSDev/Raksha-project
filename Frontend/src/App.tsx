import React, { useEffect } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import AlertsSection from "./components/AlertsSection";
import ResourceButtons from "./components/ResourceButtons";
import VolunteerSection from "./components/VolunteerSection";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./features/auth/authSlice";
import UserProfile from "./components/UserProfile";
import ResourceRequests from "./adminComponents/ResourceRequest";
import CreateResource from "./adminComponents/CreateResource";
import ResourceManagement from "./adminComponents/ResourceManagement";
import ResourcesPage from "./pages/ResourcePage";
import VolunteerForm from "./components/VolunteerForm";
import VolunteerManagement from "./adminComponents/VolunteerManagement";
import VolunteerRequests from "./adminComponents/VolunteerRequests";
import BannerUpload from "./adminComponents/BannerUpload";
import DonationPage from "./pages/DonationPage";
import AlertManagement from "./pages/AlertPage";
import ChatContainer from "./components/ChatContainer";
import '@fontsource/poppins'; 
import '@fontsource/poppins/400.css'; 
import '@fontsource/poppins/600.css';
import ProtectedRoute from "./components/ProtectRoute";
import UserManagement from "./adminComponents/UserManagement";
import { ToastContainer } from "react-toastify";
import MaterialDonationManagement from "./adminComponents/MaterialDonationManagement";
import MonetaryDonationManagement from "./adminComponents/MonetaryDonationManagement";
import VolunteerDetails from "./adminComponents/VolunteerDetails";
import VolunteerProfile from "./components/VolunteerProfile";
import NotFound from "./components/NotFound";;
import AlertPage from "./components/AlertPage";
import Map from "./components/Map";
import DisasterBanner from "./components/DisasterBanner";
import DonationBanner from "./components/DonationBanner";



const App: React.FC = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Extract token from URL and store in Redux and localStorage
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken && urlToken !== token) {
      dispatch(loginSuccess({ token: urlToken }));
      localStorage.setItem("token", urlToken);
      window.location.href = "/"; // Redirect to home page after login
    }
  }, [dispatch, token]);

  return (
    <Router>
      <ToastContainer />
      <div className="App">
        <ChatContainer />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Banner />
                <main className="container mx-auto px-4 relative z-10 -mt-20  bg-gradient-to-br from-blue-200 to-green-500 ">
                  <AlertsSection />
                  <ResourceButtons />
                  <VolunteerSection />
                  <DisasterBanner/>
                  <DonationBanner/>
                </main>
                <Footer />
              </>
            }
          />

          {/* Existing routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/upload-banner" element={<BannerUpload />} />
          <Route path="/resource-requests" element={<ResourceRequests />} />
          <Route path="/resource-management" element={<ResourceManagement />} />
          <Route
            path="/volunteer-management"
            element={<VolunteerManagement />}
          />
            <Route path="/volunteer/:id" element={<VolunteerDetails />} />
          <Route path="/volunteer-requests" element={<VolunteerRequests />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/create-resource" element={<CreateResource />} />
          <Route path="/profile" element={<ProtectedRoute component={UserProfile} />} />
          <Route path="/volunteer/profile/:volunteerId" element={<VolunteerProfile />} />
          <Route path="/volunteer-register" element={<ProtectedRoute component={VolunteerForm} />} />
          <Route path="/donation-page" element={<ProtectedRoute component={DonationPage} />} />
          <Route path="/donation-management/material" element={<MaterialDonationManagement />} />
            <Route path="/donation-management/monetary" element={<MonetaryDonationManagement />} />
          <Route path="/alert-management" element={<AlertManagement />} />
          <Route path="/alertpage"element={<ProtectedRoute component={AlertPage} />} />
          <Route path="/user-management" element={<UserManagement />} />
           <Route path="*" element={<NotFound />} />
           <Route path="/map" element={<Map />} />
          
        </Routes>
      </div>
      
    </Router>
  );
};

export default App;
