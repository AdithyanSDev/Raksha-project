import React, { useEffect, useState } from "react";
import { fetchAlerts } from "../services/alertService";
import { getUserProfile } from "../services/UserService";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";

const AlertPage: React.FC = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [hasTodayAlert, setHasTodayAlert] = useState(false);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB");
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  };

  const fetchWeatherByCoordinates = async (latitude: number, longitude: number) => {
    try {
      const weatherResponse = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            lat: latitude,
            lon: longitude,
            units: "metric",
            appid: API_KEY,
          },
        }
      );
      console.log("Daara",weatherResponse.data)
      setWeather(weatherResponse.data);
    } catch (error: any) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await getUserProfile();
        setUsername(userProfile.username);

        const alertData = await fetchAlerts();
        const sortedAlerts = alertData.sort(
          (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setAlerts(sortedAlerts);

        const today = new Date().toISOString().split("T")[0];
        const todayAlerts = sortedAlerts.some(
          (alert: any) => alert.date && alert.date.split("T")[0] === today
        );
        setHasTodayAlert(todayAlerts);

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchWeatherByCoordinates(latitude, longitude);
          },
          (error) => console.error("Geolocation error:", error.message)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getWeatherIcon = (iconCode: string) =>
    `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main min-h-screen bg-gradient-to-br from-blue-200 to-green-500">
      <Header />
      <div   className="flex flex-col lg:flex-row gap-8 p-8 mt-8">
        {/* Weather Section */}
        <div className="bg-gradient-to-br from-green-100 to-purple-200 text-gray-800 p-6 rounded-xl shadow-lg lg:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Weather in {weather?.name}</h2>
          {weather && weather.weather && (
            <div className="flex flex-col items-center">
              <img
                src={getWeatherIcon(weather.weather[0].icon)}
                alt={weather.weather[0].description}
                className="w-24 h-24"
              />
              <h3 className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</h3>
              <p className="text-gray-600 capitalize">{weather.weather[0].description}</p>
              <div className="flex justify-between w-full mt-4">
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Wind: {weather.wind.speed} m/s</p>
              </div>
            </div>
          )}
        </div>

        {/* Alerts Section */}
        <div className="bg-white flex-grow rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Hello {username || "User"},</h2>
          {hasTodayAlert ? (
            <div className="bg-yellow-100 text-yellow-300 p-4 rounded mb-4">
              <p>Emergency alerts are active for today. Stay cautious!</p>
            </div>
          ) : (
            <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
              <p>No emergency alerts. Stay safe and prepared!</p>
            </div>
          )}
          <h3 className="text-lg font-bold mb-4">Recent alerts that happened past days :</h3>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={alert.id || index}
                className="bg-yellow-100 p-4 rounded flex justify-between"
              >
                <div>
                  <h4 className="font-bold">{alert.title}</h4>
                  <p>{alert.description}</p>
                  <p className="text-sm text-gray-600">
                    Date: {formatDateTime(alert.createdAt)}
                  </p>
                </div>
                <div>
                  <button
                    className={`p-2 rounded text-white ${
                      alert.severity === "High"  ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {alert.severity}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AlertPage;


