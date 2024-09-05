import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Home = () => {
  return (
    <div className="flex h-screen bg-white">
    
      <div className="w-1/2 flex items-center justify-center bg-red-100">
        <img 
          src={logo} 
          alt="Disaster Management Logo" 
          className="w-3/4 h-auto"
        />
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <h1 className="text-5xl text-red-600 font-bold mb-6 text-center">
          Welcome to the Disaster Reporting Tool
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Stay informed about disasters, report incidents, and help others stay safe.
          Join the community today and make a difference.
        </p>

        <div className="flex flex-col items-center">

          <Link to="/register">
            <button className="bg-red-600 text-white py-3 px-6 rounded-full hover:bg-red-500 transition duration-300 mb-4">
              Register Yourself
            </button>
          </Link>


          <p className="text-gray-600">
            Already registered?{" "}
            <Link to="/login" className="text-red-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
