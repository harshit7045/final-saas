import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

function Phoneosintgraphics() {
  const navigate = useNavigate();
  useEffect(() => {
    
    const token = Cookies.get("usertoken");
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="max-w-[80vw] mx-auto p-6 mt-[5vh] text-center bg-[#0d7cf2] rounded-lg">
      <div className="text-white">
        <h2 className="text-2xl font-bold">Why using our service to expedite your investigations?</h2>
        <p className="mt-2 text-lg">Perform an email or a phone reverse lookup on our OSINT tool to uncover all social media profiles.</p>
      </div>

      <div className="mt-8 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md text-left">
          <div className="text-red-600 text-3xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold mb-2">We do not log your queries</h3>
          <p className="text-gray-700">Because we know your investigations are sensitive, we do not save any of your requests and results</p>
        </div>

        <div className="flex-1 bg-white p-6 rounded-lg shadow-md text-left">
          <div className="text-red-600 text-3xl mb-4">📡</div>
          <h3 className="text-xl font-semibold mb-2">We do not notify the target</h3>
          <p className="text-gray-700">We only implement OSINT techniques that do not send a notification to the target</p>
        </div>

        <div className="flex-1 bg-white p-6 rounded-lg shadow-md text-left">
          <div className="text-red-600 text-3xl mb-4">🚫</div>
          <h3 className="text-xl font-semibold mb-2">We do not show false positives</h3>
          <p className="text-gray-700">Only real-time results from social networks, allowing you to save time on your investigations</p>
        </div>
      </div>
    </div>
  );
};

export default Phoneosintgraphics;
