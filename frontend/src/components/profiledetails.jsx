import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
function Profile() {
  const [profileDetails, setProfileDetails] = useState(null);
  const getProfileDetails = async () => {
    try {
      const backendUrl = `http://${import.meta.env.VITE_BACKEND_IP || 'localhost'}:${import.meta.env.VITE_BACKEND_PORT || '4002'}`;
      const response = await fetch(
        `${backendUrl}/api/user/user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("usertoken"),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setProfileDetails(result);
    } catch (error) {
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  return (
    <div className="glass rounded-2xl p-6 md:p-8 mt-10 w-full max-w-3xl mx-auto text-white">
      <div>
        {profileDetails ? (
          <div>
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent neon-text">Profile</span>
            </h2>
            <div className="flex items-center mb-6">
              <img
                src="https://img.freepik.com/free-vector/detective-wearing-brown-overcoat-white-background_1308-90624.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Profile"
                className="w-40 h-40 rounded-full mr-4 border border-white/20"
              />
              <div>
                <h3 className="text-xl font-semibold">{profileDetails.name || "N/A"}</h3>
              </div>
            </div>
            <div className="border-t border-white/10 pt-4">
              <div className="mb-4">
                <p className="text-gray-300 text-sm">Email</p>
                <p className="text-white">{profileDetails.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">Wallet Balance</p>
                <p className="text-white">{profileDetails.walletBalance || "N/A"}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-300">Loading profile...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
