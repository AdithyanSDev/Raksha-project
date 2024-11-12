import React, { useEffect, useState, useRef } from "react";
import { fetchAlerts } from "../services/alertService";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { format } from "date-fns";
import { FaExpand, FaTimes } from "react-icons/fa";
import L from "leaflet";

interface Alert {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  latitude: number;
  longitude: number;
}

const AlertsSection: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const data = await fetchAlerts();
        console.log("Fetched alerts data:", data); // Debugging line to check alert data
        const today = new Date();
        console.log(today)
        const filteredAlerts = data.filter((alert: Alert) => {
          const alertDate = new Date(alert.createdAt);
          console.log(alertDate)
          return (
            alertDate.getFullYear() === today.getFullYear() &&
            alertDate.getMonth() === today.getMonth() &&
            alertDate.getDate() === today.getDate()
          );
        });
        setAlerts(filteredAlerts);
        console.log(filteredAlerts)
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };
    loadAlerts();
  }, []);

  const toggleExpandedMap = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isExpanded]);

  return (
    <section className="p-8 bg-white shadow-md my-6 flex relative">
      <div className="flex-1">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 mb-4 rounded-md relative"
            >
              <h2 className="text-xl font-bold">{alert.title}</h2>
              <p>{alert.description}</p>
              <p className="absolute bottom-2 right-2 text-sm text-gray-600">
                {format(new Date(alert.createdAt), "MM/dd/yyyy, HH:mm")}
              </p>
            </div>
          ))
        ) : (
          <div className="p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-md">
            <h2 className="text-xl font-bold">Everything looks normal</h2>
            <p>Have a great day!</p>
          </div>
        )}
      </div>

      {/* Small Map Section */}
      {!isExpanded && (
        <div className="ml-6 w-1/2 relative z-10">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            className="h-96 w-full rounded-lg shadow-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {alerts.map(
              (alert) =>
                alert.latitude !== undefined &&
                alert.longitude !== undefined && (
                  <Marker
                    key={alert.id}
                    position={[alert.latitude, alert.longitude]}
                    icon={L.icon({
                      iconUrl: "marker-icon.png",
                      iconSize: [25, 41],
                    })}
                  >
                    <Popup>
                      <strong>{alert.title}</strong>
                      <p>{alert.description}</p>
                      <p>
                        {format(new Date(alert.createdAt), "MM/dd/yyyy, HH:mm")}
                      </p>
                    </Popup>
                  </Marker>
                )
            )}
          </MapContainer>
          <button
            onClick={toggleExpandedMap}
            className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full"
            aria-label="Expand map"
          >
            <FaExpand className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Expanded Map Modal */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg w-full h-full max-w-4xl max-h-screen overflow-hidden relative"
          >
            <button
              onClick={toggleExpandedMap}
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full"
              aria-label="Close map"
            >
              <FaTimes className="w-5 h-5" />
            </button>
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={5}
              className="w-full h-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              {alerts.map((alert) => (
                <Marker
                  key={alert.id}
                  position={[alert.latitude, alert.longitude]}
                  icon={L.icon({
                    iconUrl: "marker-icon.png",
                    iconSize: [25, 41],
                  })}
                >
                  <Popup>
                    <strong>{alert.title}</strong>
                    <p>{alert.description}</p>
                    <p>
                      {format(new Date(alert.createdAt), "MM/dd/yyyy, HH:mm")}
                    </p>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      )}
    </section>
  );
};

export default AlertsSection;
