import React from "react";
import InteractiveMap from "../components/Interactivemap";
import { useNavigate } from "react-router-dom";

const fakeReports = [
  { id: 1, title: "Flood in City Center", description: "Heavy flooding reported in downtown area.", date: "2024-09-05" },
  { id: 2, title: "Road Blockage on Highway 5", description: "Accident causing major traffic congestion.", date: "2024-09-04" },
  { id: 3, title: "Damaged Building in Sector 7", description: "Structural damage observed in residential building.", date: "2024-09-03" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Handle "Submit a Report" button click
  const handleSubmitReport = () => {
    navigate("/submit-report");
  };

  // Handle SOS button click
  const handleSOSClick = () => {
    const emergencyNumber = "+911234567890";
    window.location.href = `tel:${emergencyNumber}`; // Use backticks for string interpolation
  };

  // Handle Emergency Request button click
  const handleEmergencyRequest = () => {
    navigate("/emergency-request");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 bg-red-200 p-4">
        {/* Sidebar content */}
        <h2 className="text-xl font-bold mb-4">Recent Reports</h2>
        <div className="space-y-2">
          {fakeReports.map((report) => (
            <div key={report.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{report.title}</h3>
              <p className="text-sm text-gray-600">{report.description}</p>
              <p className="text-xs text-gray-400 mt-1">{report.date}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-grow flex items-center justify-center bg-white">
          <InteractiveMap className="w-full h-full" />
        </div>
        <footer className="bg-white p-4">
          <div className="flex justify-around">
            <button
              onClick={handleSubmitReport}
              className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-500 transition duration-300"
            >
              Submit a Report
            </button>
            <button
              onClick={handleEmergencyRequest}
              className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-500 transition duration-300"
            >
              Request Blood/Oxygen
            </button>
            <button
              onClick={handleSOSClick}
              className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-500 transition duration-300"
            >
              Send SOS
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
