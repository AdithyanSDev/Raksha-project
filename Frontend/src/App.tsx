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
      <div className="App">
        <ChatContainer />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Banner />
                <main className="container mx-auto px-4">
                  <AlertsSection />
                  <ResourceButtons />
                  <VolunteerSection />
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
          <Route path="/volunteer-requests" element={<VolunteerRequests />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/create-resource" element={<CreateResource />} />
          <Route path="/profile" element={<ProtectedRoute component={UserProfile} />} />
          <Route path="/volunteer-register" element={<VolunteerForm />} />
          <Route path="/donation-page" element={<DonationPage />} />
          <Route path="/alert-management" element={<AlertManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
