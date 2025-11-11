import React, { useState } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaSearch, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

function Phonesearchcomponent() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const PhoneOSintRequest = async () => {
    if (!phoneNumber) {
      setErrorMessage("Please enter a phone number");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSearchResults([]);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      setErrorMessage("Search failed. The request took too long. Please try again.");
    }, 30000);

    try {
      const backendUrl = `http://${import.meta.env.VITE_BACKEND_IP || 'localhost'}:${import.meta.env.VITE_BACKEND_PORT || '4002'}`;
      const response = await fetch(
        `${backendUrl}/api/phoneosint/phone?phone=${encodeURIComponent(phoneNumber)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("usertoken"),
          },
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setSearchResults(prevResults => [...prevResults, result]);
    } catch (error) {
      clearTimeout(timeoutId);
      setErrorMessage("Search failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-28 pb-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <HiSparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-semibold text-white">Phone Investigation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Phone Number
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Intelligence Search
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Validate phone numbers and get location, carrier, and line type information
          </p>
        </motion.div>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-3xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter phone number (e.g., +1-555-123-4567)"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setErrorMessage("");
                }}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
              />
            </div>
            <motion.button
              onClick={PhoneOSintRequest}
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.05 }}
              whileTap={{ scale: isLoading ? 1 : 0.95 }}
              className={`btn-modern px-8 py-4 rounded-xl font-bold text-base shadow-lg flex items-center gap-2 ${
                isLoading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-indigo-600 shadow-purple-500/50'
              } text-white`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <FaSearch className="w-4 h-4" />
                  <span>Search</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-sm"
              >
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card rounded-2xl p-12 text-center"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-6"></div>
              <p className="text-gray-400 text-lg">Searching for phone details...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results */}
        {!isLoading && searchResults.length === 0 && !errorMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card rounded-2xl p-12 text-center"
          >
            <FaPhone className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400">No results found. Enter a phone number to search.</p>
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {!isLoading && searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {searchResults.map((row, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Number */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FaPhone className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-400 text-sm font-semibold">Phone Number</span>
                      </div>
                      <p className="text-white font-bold text-lg">{row.international_format || 'N/A'}</p>
                    </div>

                    {/* Valid Status */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {row.valid ? (
                          <FaCheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <FaTimesCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className="text-gray-400 text-sm font-semibold">Validity</span>
                      </div>
                      <p className={`font-bold ${row.valid ? 'text-green-400' : 'text-red-400'}`}>
                        {row.valid ? "Valid" : "Invalid"}
                      </p>
                    </div>

                    {/* Location */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-400 text-sm font-semibold">Location</span>
                      </div>
                      <p className="text-white">{row.location || 'N/A'}</p>
                    </div>

                    {/* Carrier */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-400 text-sm font-semibold">Carrier</span>
                      </div>
                      <p className="text-white">{row.carrier || 'N/A'}</p>
                    </div>

                    {/* Country */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-400 text-sm font-semibold">Country</span>
                      </div>
                      <p className="text-white">{row.country_name || 'N/A'}</p>
                    </div>

                    {/* Line Type */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-400 text-sm font-semibold">Line Type</span>
                      </div>
                      <p className="text-white">{row.line_type || 'N/A'}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Phonesearchcomponent;
