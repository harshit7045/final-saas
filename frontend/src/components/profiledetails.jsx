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
    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md mt-[5vh] w-full max-w-[80vw] mx-auto">
      <div>{profileDetails ? <div>
        <h2 className="text-4xl ml-[2vw] font-semibold mb-4">Profile</h2>
      <div className="flex items-center mb-6">
        <img
          src="data:image/jpeg;base64,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" // replace with actual image URL
          alt="Profile"
          className="w-40 h-40 rounded-full mr-4"
        />
        <div>
          <h3 className="text-xl font-semibold">
            {profileDetails.name || "N/A"}
          </h3>
        </div>
      </div>
      <div className="border-t ml-[2vw] border-gray-200 pt-4">
        <div className="mb-4">
          <p className="text-gray-500 text-sm">Email</p>
          <p className="text-gray-800">{profileDetails.email || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Wallet Balance</p>
          <p className="text-gray-800">
            {profileDetails.walletBalance || "N/A"}
          </p>
        </div>
      </div>
      </div> : <p>Loading profile...</p>}</div>
    </div>
  );
}

export default Profile;
