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
    <div
      className="relative flex size-full min-h-[70vh] flex-col bg-slate-50 overflow-x-hidden"
      style={{ fontFamily: "Inter, 'Noto Sans', sans-serif" }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#0d141c] tracking-light text-[32px] font-bold leading-tight min-w-72">
                Email Search
              </p>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <input
                  id="email-search"
                  placeholder="example@domain.com"
                  className="form-input w-full flex-1 resize-none overflow-hidden rounded-xl text-[#0d141c] focus:outline-0 focus:ring-0 border-none bg-[#e7edf4] h-14 placeholder:text-[#49719c] p-4 text-base font-normal"
                />
              </label>
            </div>
            <div className="flex px-4 py-3 justify-end">
              <button
                onClick={emailSearch}
                disabled={isLoading}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#0d7cf2] text-slate-50 text-sm font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  <span className="truncate">Search</span>
                )}
              </button>
            </div>
            {errorMessage && (
              <div className="px-4 py-2 mx-4 mb-2 bg-red-100 border border-red-400 text-red-700 rounded">
                {errorMessage}
              </div>
            )}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-8 px-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0d7cf2] mb-4"></div>
                <p className="text-[#49719c] text-base">Searching for details...</p>
              </div>
            )}
            {!isLoading && searchResults.length === 0 && !errorMessage && (
              <div className="px-4 py-3 text-[#49719c] text-sm">No results found. Enter an email to search.</div>
            )}
            <div className="px-4 py-3 w-[80vw] lg:w-auto @container">
              <div className="flex overflow-scroll rounded-xl border border-[#cedbe8] bg-slate-50">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-slate-50">
                    <th className="px-4 py-3 text-left text-[#0d141c] w-[80vw] text-sm font-medium">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-[#0d141c] w-[80vw] text-sm font-medium">
                        Valid
                      </th>
                      <th className="px-4 py-3 text-left text-[#0d141c] w-[80vw] text-sm font-medium">
                        Disposable
                      </th>
                      <th className="px-4 py-3 text-left text-[#0d141c] w-[80vw] text-sm font-medium">
                        Domain
                      </th>
                      <th className="px-4 py-3 text-left text-[#0d141c] w-[80vw] text-sm font-medium">
                        MX IP
                      </th>
                      <th className="px-4 py-3 text-left text-[#0d141c] w-[80vw] text-sm font-medium">
                        MX Info
                      </th>
                      <th className="px-4 py-3 text-left text-[#0d141c] w-[80vw] text-sm font-medium">
                        Email Forwarder
                      </th>
                      
                      <th className="px-4 py-3 text-left text-[#0d141c] w-[80vw] text-sm font-medium">
                        Reason
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading && searchResults.map((row, index) => (
                      <tr key={index} className="border-t border-[#cedbe8]">
                        <td className="h-[72px] px-4 py-2 w-[80vw] text-[#0d141c] text-sm font-normal">
                          {row.email}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[80vw] text-[#0d141c] text-sm font-normal">
                          {row.valid ? 'Yes' : 'No'}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[80vw] text-[#49719c] text-sm font-normal">
                          {row.disposable ? 'Yes' : 'No'}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[80vw] text-[#49719c] text-sm font-normal">
                          {row.domain}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[80vw] text-[#49719c] text-sm font-normal">
                          {row.mx_ip}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[80vw] text-[#49719c] text-sm font-normal">
                          {row.mx_info}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[80vw] text-[#49719c] text-sm font-normal">
                          {row.email_forwarder?"Yes":"No"}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[80vw] text-[#49719c] text-sm font-normal">
                          {row.reason}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailSearchComponent;
