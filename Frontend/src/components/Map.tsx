import { MapContainer, TileLayer, LayersControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Map: React.FC = () => {
  const OWM_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const [location, setLocation] = useState<[number, number] | null>(null);

  // Get the user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error fetching user location:", error);
          setLocation([20, 78]); // Default to India if location access fails
        }
      );
    } else {
      console.error("Geolocation not supported by this browser.");
      setLocation([20, 78]); // Default to India
    }
  }, []);

  if (!OWM_API_KEY) {
    console.error("OpenWeatherMap API key is missing.");
    return <div>API Key is not configured.</div>;
  }

  if (!location) {
    return <div>Loading map...</div>; // Show loading state until location is fetched
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-200 to-green-500">
      <header className="bg-transparent text-green-500 py-4 text-3xl font-bold w-full">
        <Link to="/" className="hover:underline ml-4">
          Raksha
        </Link>
      </header>

      <div className="flex flex-grow mt-5 mx-4 mb-5">
        {/* Left Text Section */}
        <div className="w-1/3 bg-white shadow-lg rounded-lg p-8 mr-4 bg-gradient-to-br from-purple-300 via-indigo-200 to-blue-100 transition-all duration-300 ease-in-out transform hover:scale-95 hover:shadow-2xl hover:cursor-pointer">
          <h2 className="text-4xl font-bold text-indigo-700 mb-6 transition-all duration-300 ease-in-out transform hover:text-purple-600">
            Map Section
          </h2>
          <p className="text-gray-800 text-lg font-medium leading-relaxed transition-all duration-300 ease-in-out hover:text-gray-600">
            This map allows you to visualize the climatic severity of your
            location. You can view layers like temperature, precipitation, cloud
            cover, and more. Use the map controls to toggle between different
            layers and see detailed information.
          </p>
        </div>

        {/* Map Section */}
        <div className="w-2/3">
          <MapContainer
            center={location} // Center on user's live location
            zoom={10}
            className="h-[500px] w-full rounded-lg shadow-lg overflow-hidden"
          >
            {/* Base map layer with place names and borders */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            <LayersControl position="topright">
              {/* Temperature Layer */}
              <LayersControl.Overlay checked name="Temperature">
                <TileLayer
                  url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${OWM_API_KEY}`}
                  attribution="&copy; <a href='https://openweathermap.org/'>OpenWeatherMap</a>"
                />
              </LayersControl.Overlay>

              {/* Clouds Layer */}
              <LayersControl.Overlay name="Clouds">
                <TileLayer
                  url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${OWM_API_KEY}`}
                  attribution="&copy; <a href='https://openweathermap.org/'>OpenWeatherMap</a>"
                />
              </LayersControl.Overlay>

              {/* Precipitation Layer */}
              <LayersControl.Overlay name="Precipitation">
                <TileLayer
                  url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${OWM_API_KEY}`}
                  attribution="&copy; <a href='https://openweathermap.org/'>OpenWeatherMap</a>"
                />
              </LayersControl.Overlay>

              {/* Wind Layer */}
              <LayersControl.Overlay name="Wind Speed">
                <TileLayer
                  url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${OWM_API_KEY}`}
                  attribution="&copy; <a href='https://openweathermap.org/'>OpenWeatherMap</a>"
                />
              </LayersControl.Overlay>

              {/* Pressure Layer */}
              <LayersControl.Overlay name="Pressure">
                <TileLayer
                  url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${OWM_API_KEY}`}
                  attribution="&copy; <a href='https://openweathermap.org/'>OpenWeatherMap</a>"
                />
              </LayersControl.Overlay>
            </LayersControl>
          </MapContainer>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Map;
