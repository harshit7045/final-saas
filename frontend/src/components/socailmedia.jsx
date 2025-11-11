import React, { useState } from "react";
import Cookies from "js-cookie";

function SocialMediaUserEnrichment() {
  const [searchResultsTwitter, setSearchResultsTwitter] = useState([]);
  const [searchResultsInstagram, setSearchResultsInstagram] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const socialMediaOSintRequest = async () => {
    const username = document.getElementById("username").value;

    if (!username) {
      setErrorMessage("Please enter a username");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSearchResultsTwitter([]);
    setSearchResultsInstagram([]);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      setErrorMessage("Search failed. The request took too long. Please try again.");
    }, 30000);

    try {
      const backendUrl = `http://${import.meta.env.VITE_BACKEND_IP || 'localhost'}:${import.meta.env.VITE_BACKEND_PORT || '4002'}`;
      const response = await fetch(
        `${backendUrl}/api/socialmediaosint/social?id=${encodeURIComponent(username)}`,
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
      
      if (result.twitter) {
        setSearchResultsTwitter([result.twitter]);
      }
      
      if (result.insta) {
        setSearchResultsInstagram([result.insta]);
      }
      
      if (!result.twitter && !result.insta) {
        setErrorMessage("No results found for this username.");
      }
    } catch (error) {
      clearTimeout(timeoutId);
      setErrorMessage("Search failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-28 pb-20 overflow-x-hidden" style={{ fontFamily: "Inter, 'Noto Sans', sans-serif" }}>
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <span className="text-sm font-semibold text-white">Social Media OSINT</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            User
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent neon-text">
              Enrichment
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Lookup usernames across Instagram and Twitter to reveal public profile details</p>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <label className="flex flex-col flex-1">
              <input
                id="username"
                placeholder="Enter a username (e.g. johndoe)"
                className="futuristic-input w-full flex-1 resize-none overflow-hidden rounded-xl text-white h-14 placeholder:text-gray-400 p-4 text-base"
              />
            </label>
            <button
              onClick={socialMediaOSintRequest}
              disabled={isLoading}
              className="btn-modern flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                <span className="truncate">Search</span>
              )}
            </button>
          </div>

          {errorMessage && (
            <div className="px-4 py-2 mt-4 bg-red-500/20 border border-red-400 text-red-300 rounded">
              {errorMessage}
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-8 px-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mb-4"></div>
              <p className="text-gray-300 text-base">Searching for details...</p>
            </div>
          )}

          {!isLoading && searchResultsInstagram.length === 0 && searchResultsTwitter.length === 0 && !errorMessage && (
            <div className="px-4 py-3 text-gray-300 text-sm">No results found. Enter a username to search.</div>
          )}
        </div>

        <div className="@container">
          <div className="glass rounded-2xl overflow-hidden mb-8">
            <div className="flex items-center justify-between px-4 py-3">
              <h3 className="text-xl font-bold text-white">Instagram</h3>
            </div>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-white text-sm font-semibold">Profile Picture</th>
                  <th className="px-4 py-3 text-left text-white text-sm font-semibold">Username</th>
                  <th className="px-4 py-3 text-left text-white text-sm font-semibold">Full Name</th>
                  <th className="px-4 py-3 text-left text-white text-sm font-semibold">Followers</th>
                  <th className="px-4 py-3 text-left text-white text-sm font-semibold">Bio</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading && searchResultsInstagram.map((row, index) => (
                  <tr key={index} className="border-t border-white/10">
                    <td className="h-[72px] px-4 py-2 text-gray-200 text-sm">
                      {row.profile_pic_url_hd ? (
                        <a href={row.profile_pic_url_hd} target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-pink-300 underline">Profile Pic</a>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="h-[72px] px-4 py-2 text-gray-200 text-sm">{row.username || "N/A"}</td>
                    <td className="h-[72px] px-4 py-2 text-gray-200 text-sm">{row.full_name || "N/A"}</td>
                    <td className="h-[72px] px-4 py-2 text-gray-200 text-sm">{row.followers || "N/A"}</td>
                    <td className="h-[72px] px-4 py-2 text-gray-200 text-sm">{row.bio || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <h3 className="text-xl font-bold text-white">Twitter</h3>
            </div>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-white text-sm font-semibold">ID</th>
                  <th className="px-4 py-3 text-left text-white text-sm font-semibold">Created At</th>
                  <th className="px-4 py-3 text-left text-white text-sm font-semibold">Professional Type</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading && searchResultsTwitter.map((row, index) => (
                  <tr key={index} className="border-t border-white/10">
                    <td className="h-[72px] px-4 py-2 text-gray-200 text-sm">{row.id || "N/A"}</td>
                    <td className="h-[72px] px-4 py-2 text-gray-200 text-sm">{row.legacy?.created_at || "N/A"}</td>
                    <td className="h-[72px] px-4 py-2 text-gray-200 text-sm">{row.professional?.professional_type || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialMediaUserEnrichment;
