import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const SubmitReportForm = () => {
  const { token } = useAuth();  // Access the token from AuthContext
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contactNumber: "",
    disasterType: "",
    details: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Include token in request headers if it exists
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        'http://127.0.0.1:8000/api/reports/',
        {
          name: formData.name,
          location: formData.location,
          contact: formData.contactNumber,
          report_type: formData.disasterType.toUpperCase(), // Ensure it matches your backend choices
          description: formData.details,
        },
        config  // Pass the config containing the token
      );

      console.log(response.data);
      alert("Report submitted successfully!");
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Error submitting report.");
    }
  };

  return (
    <div className="flex h-screen bg-white items-center justify-center">
      <div className="w-full max-w-lg bg-red-100 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl text-center text-red-600 font-bold mb-4">
          Submit a Report
        </h1>

        <p className="text-center text-gray-600 italic mb-4">
          Please provide the details of the disaster you're reporting.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-gray-700">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-gray-700">Disaster Type</label>
            <select
              name="disasterType"
              value={formData.disasterType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select...</option>
              <option value="flood">Flood</option>
              <option value="earthquake">Earthquake</option>
              <option value="fire">Fire</option>
              <option value="storm">Storm</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Details</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows="4"
              required
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 px-6 rounded-full hover:bg-red-500 transition duration-300"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitReportForm;
