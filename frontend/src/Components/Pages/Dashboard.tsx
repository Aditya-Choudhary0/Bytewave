
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleGetStartedClick = () => {
    if (email.trim() === "" || name.trim() === "") {
      setShowToast(true);
    } else {
      // Save name and email in local storage
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      navigate("/interview");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="max-w-md w-full p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-gray-800 text-3xl font-bold mb-4">
          Elevate Your Interview Skills
        </h1>
        <p className="text-gray-600 text-lg font-semibold mb-6">
          Sharpen your technical skills with real-time practice and instant feedback!
        </p>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="email"
            id="email"
            placeholder="Enter your email here.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            id="name"
            placeholder="Enter your name here.."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button
          className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 px-6 rounded-md hover:from-teal-500 hover:to-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleGetStartedClick}
        >
          Get Started
        </button>
        {showToast && (
          <div className="text-red-600 mt-2">
            Please fill in all fields before clicking Get Started.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
