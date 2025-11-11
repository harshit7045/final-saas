import React from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Pricing() {
  const navigate = useNavigate();
  const handlePayment = (amount) => {
    navigate("/checkout", { state: { amount: parseInt(amount) } });
  };
 
  useEffect(() => {
    const token = Cookies.get("usertoken");
    if (!token) {
      navigate("/login");
    }
  }, []);
 
  return (
    <div className="max-w-6xl mx-auto px-6 my-12">
      <h2 className="text-center text-3xl md:text-4xl font-black text-white mb-8">
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent neon-text">Choose your plan</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Standard Plan */}
        <div className="glass rounded-2xl p-8">
          <div className="flex flex-col gap-2 mb-4">
            <h3 className="text-white text-lg font-bold">Standard</h3>
            <p className="flex items-baseline gap-2 text-white">
              <span className="text-4xl font-black tracking-tight">$99</span>
            </p>
          </div>
          <button onClick={() => handlePayment(500)} className="btn-modern w-full h-11 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold">
            Proceed to checkout
          </button>
          <div className="flex flex-col gap-2 mt-6 text-gray-300">
            <div className="flex items-center gap-3 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="text-purple-300">
                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
              500 credits
            </div>
            <div className="flex items-center gap-3 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="text-purple-300">
                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
              Advanced data sources
            </div>
            <div className="flex items-center gap-3 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="text-purple-300">
                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
              Unlimited search results
            </div>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="glass rounded-2xl p-8">
          <div className="flex flex-col gap-2 mb-4">
            <h3 className="text-white text-lg font-bold">Pro</h3>
            <p className="flex items-baseline gap-2 text-white">
              <span className="text-4xl font-black tracking-tight">$299</span>
            </p>
          </div>
          <button onClick={() => handlePayment(2000)} className="btn-modern w-full h-11 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold">
            Proceed to checkout
          </button>
          <div className="flex flex-col gap-2 mt-6 text-gray-300">
            <div className="flex items-center gap-3 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="text-purple-300">
                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
              2000 credits
            </div>
            <div className="flex items-center gap-3 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="text-purple-300">
                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
              All data sources
            </div>
            <div className="flex items-center gap-3 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="text-purple-300">
                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
              All features
            </div>
            <div className="flex items-center gap-3 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="text-purple-300">
                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
              Unlimited search results
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Pricing;
