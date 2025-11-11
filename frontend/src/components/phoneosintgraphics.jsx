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
    <div className="max-w-[100vw]  text-center ">
      <div className=" p-8 bg-gradient-to-br from-slate-900/80 via-purple-900/80 to-slate-900/80 border border-white/10 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-black text-white/90">
          Why using our service to
          <span className="ml-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">expedite your investigations?</span>
        </h2>
        <p className="mt-3 text-base md:text-lg text-gray-300">
          Perform an email or a phone reverse lookup on our OSINT tool to uncover all social media profiles.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="glass-card rounded-xl p-6 transition-all hover:neon-glow">
            <div className="text-3xl mb-4 text-purple-300">🔒</div>
            <h3 className="text-xl font-semibold text-white mb-2">We do not log your queries</h3>
            <p className="text-gray-300">Because we know your investigations are sensitive, we do not save any of your requests and results</p>
          </div>
          <div className="glass-card rounded-xl p-6 transition-all hover:neon-glow">
            <div className="text-3xl mb-4 text-purple-300">📡</div>
            <h3 className="text-xl font-semibold text-white mb-2">We do not notify the target</h3>
            <p className="text-gray-300">We only implement OSINT techniques that do not send a notification to the target</p>
          </div>
          <div className="glass-card rounded-xl p-6 transition-all hover:neon-glow">
            <div className="text-3xl mb-4 text-purple-300">🚫</div>
            <h3 className="text-xl font-semibold text-white mb-2">We do not show false positives</h3>
            <p className="text-gray-300">Only real-time results from social networks, allowing you to save time on your investigations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phoneosintgraphics;
