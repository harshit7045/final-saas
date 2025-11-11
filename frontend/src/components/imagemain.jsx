import React, { useState } from "react";
import Cookies from "js-cookie";
import SimpleAlert from "./alert";
function Imagesearchcomponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setAlertData({
          severity: "error",
          message: "Please select an image file."
        });
        return;
      }
      setSelectedFile(file);
      setAlertData({ severity: "", message: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setAlertData({
        severity: "error",
        message: "Please select a file to upload."
      });
      return;
    }

    setIsLoading(true);
    setAlertData({ severity: "", message: "" });
    setSearchResults([]);
    setUploadedImageUrl(null);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      setAlertData({
        severity: "error",
        message: "Search failed. The request took too long. Please try again."
      });
    }, 30000);

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const backendUrl = `http://${import.meta.env.VITE_BACKEND_IP || 'localhost'}:${import.meta.env.VITE_BACKEND_PORT || '4002'}`;
      const response = await fetch(`${backendUrl}/api/imageosint/upload`, {
        method: "POST",
        body: formData,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.data || []);
        setUploadedImageUrl(data.imageUrl);
        setAlertData({
          severity: "success",
          message: "Image uploaded and search completed successfully!"
        });
      } else {
        const errorData = await response.json().catch(() => ({ error: "Failed to upload file." }));
        setAlertData({
          severity: "error",
          message: errorData.error || "Failed to upload file. Please try again."
        });
      }
    } catch (error) {
      clearTimeout(timeoutId);
      setAlertData({
        severity: "error",
        message: "Search failed. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex size-full min-h-[70vh] flex-col bg-slate-50 overflow-x-hidden" style={{ fontFamily: "Inter, 'Noto Sans', sans-serif" }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#0d141c] tracking-light text-[32px] font-bold leading-tight min-w-72">
                Reverse Image Search
              </p>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <input 
                  type="file" 
                  name="avatar" 
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isLoading}
                  className="mb-2"
                />
                <button 
                  type="button" 
                  onClick={handleSubmit} 
                  disabled={isLoading || !selectedFile}
                  className="mt-2 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#0d7cf2] text-slate-50 text-sm font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Uploading..." : "Upload & Search"}
                </button>
              </label>
            </div>
            
            {uploadedImageUrl && (
              <div className="flex flex-col px-4 py-4 mb-6">
                <h3 className="text-sm font-semibold text-[#0d141c] mb-3 uppercase tracking-wide">Uploaded Image</h3>
                <div className="inline-block border-2 border-[#cedbe8] rounded-lg p-3 bg-white shadow-sm">
                  <img 
                    src={uploadedImageUrl} 
                    alt="Uploaded" 
                    className="max-w-full max-h-80 object-contain rounded"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col px-4 py-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#0d141c]">
                  Search Results
                  {searchResults.length > 0 && (
                    <span className="ml-2 text-base font-normal text-[#49719c]">
                      ({searchResults.length} found)
                    </span>
                  )}
                </h2>
              </div>
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0d7cf2] mb-4"></div>
                  <p className="text-[#49719c] text-base">Searching for similar images...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((result) => (
                    <a 
                      href={result.link} 
                      key={result.position} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block group"
                    >
                      <div className="flex items-start p-4 border border-[#cedbe8] rounded-lg bg-white hover:shadow-md hover:border-[#0d7cf2] transition-all duration-200">
                        {result.thumbnail && (
                          <div className="flex-shrink-0 mr-4">
                            <img 
                              src={result.thumbnail} 
                              alt={result.title || 'Result'} 
                              className="w-24 h-24 object-cover rounded border border-[#cedbe8]"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="text-base font-semibold text-[#0d141c] group-hover:text-[#0d7cf2] transition-colors line-clamp-2 flex-1">
                              {result.title || 'No title'}
                            </h3>
                            <span className="flex-shrink-0 text-xs text-[#49719c] font-medium bg-[#e7edf4] px-2 py-1 rounded">
                              #{result.position}
                            </span>
                          </div>
                          <p className="text-sm text-[#49719c] mt-1 truncate">
                            {result.displayed_link || result.link || 'No link'}
                          </p>
                          {result.description && (
                            <p className="text-sm text-[#0d141c] mt-2 line-clamp-2">
                              {result.description}
                            </p>
                          )}
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          <svg className="w-5 h-5 text-[#49719c] group-hover:text-[#0d7cf2] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <svg className="w-16 h-16 text-[#cedbe8] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-[#49719c] text-base">No results found. Upload an image to search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SimpleAlert severity={alertData.severity} message={alertData.message} />
    </div>
  );
}

export default Imagesearchcomponent;
