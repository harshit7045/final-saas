import React, { useState } from "react";
import Cookies from "js-cookie";

function EmailSearchComponent() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const emailSearch = async () => {
    const email = document.getElementById("email-search").value;

    if (!email) {
      setErrorMessage("Please enter an email address");
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
        `${backendUrl}/api/emailosint/email?email=${encodeURIComponent(email)}`,
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
      result.email = email;
      setSearchResults(prevResults => [...prevResults, result]);
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
            <span className="text-sm font-semibold text-white">Email Investigation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Email
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent neon-text">
              Intelligence Search
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Validate email addresses and check deliverability, domain, and MX records</p>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <label className="flex flex-col flex-1">
              <input
                id="email-search"
                placeholder="example@domain.com"
                className="futuristic-input w-full flex-1 resize-none overflow-hidden rounded-xl text-white h-14 placeholder:text-gray-400 p-4 text-base"
              />
            </label>
            <button
              onClick={emailSearch}
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

          {!isLoading && searchResults.length === 0 && !errorMessage && (
            <div className="px-4 py-3 text-gray-300 text-sm">No results found. Enter an email to search.</div>
          )}
        </div>

        <div className="@container">
          <div className="glass rounded-2xl overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="">
                  <th className="px-4 py-3 text-left text-white text-sm font-semibold">Email</th>
                  <th className="px-4 py-3 text-left text-white text-sm font-semibold">Valid</th>
                  <th className="px-4 py-3 text-left text-white text-sm font-semibold">Disposable</th>
                  <th className="px-4 py-3 text-left text-white text-sm font-semibold">Domain</th>
                  <th className="px-4 py-3 text-left text-white text-sm font-semibold">MX IP</th>
                  <th className="px-4 py-3 text-left text-white text-sm font-semibold">MX Info</th>
                  <th className="px-4 py-3 text-left text-white text-sm font-semibold">Email Forwarder</th>
                  <th className="px-4 py-3 text-left text-white text-sm font-semibold">Reason</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading && searchResults.map((row, index) => (
                  <tr key={index} className="border-t border-white/10">
                    <td className="h-[72px] px-4 py-2 text-gray-200 text-sm">{row.email}</td>
                    <td className="h-[72px] px-4 py-2 text-gray-200 text-sm">{row.valid ? 'Yes' : 'No'}</td>
                    <td className="h-[72px] px-4 py-2 text-gray-300 text-sm">{row.disposable ? 'Yes' : 'No'}</td>
                    <td className="h-[72px] px-4 py-2 text-gray-300 text-sm">{row.domain}</td>
                    <td className="h-[72px] px-4 py-2 text-gray-300 text-sm">{row.mx_ip}</td>
                    <td className="h-[72px] px-4 py-2 text-gray-300 text-sm">{row.mx_info}</td>
                    <td className="h-[72px] px-4 py-2 text-gray-300 text-sm">{row.email_forwarder ? 'Yes' : 'No'}</td>
                    <td className="h-[72px] px-4 py-2 text-gray-300 text-sm">{row.reason}</td>
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

export default EmailSearchComponent;
