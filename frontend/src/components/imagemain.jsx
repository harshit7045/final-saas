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
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-28 pb-20 overflow-x-hidden" style={{ fontFamily: "Inter, 'Noto Sans', sans-serif" }}>
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <span className="text-sm font-semibold text-white">Reverse Image</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Image
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent neon-text">
              Intelligence Search
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Upload an image to find similar images and discover where it appears online</p>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <label className="flex flex-col flex-1">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isLoading}
                className="futuristic-input w-full rounded-xl text-white h-14 p-3"
              />
            </label>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !selectedFile}
              className="btn-modern flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isLoading ? "Uploading..." : "Upload & Search"}
            </button>
          </div>

          {uploadedImageUrl && (
            <div className="flex flex-col mt-6">
              <h3 className="text-sm font-semibold text-gray-200 mb-3 uppercase tracking-wide">Uploaded Image</h3>
              <div className="inline-block rounded-lg p-3 glass-card">
                <img
                  src={uploadedImageUrl}
                  alt="Uploaded"
                  className="max-w-full max-h-80 object-contain rounded"
                />
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mb-4"></div>
              <p className="text-gray-300 text-base">Searching for similar images...</p>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">
                  Search Results
                  {searchResults.length > 0 && (
                    <span className="ml-2 text-base font-normal text-gray-300">({searchResults.length} found)</span>
                  )}
                </h2>
              </div>

              {searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((result) => (
                    <a
                      href={result.link}
                      key={result.position}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <div className="flex items-start p-4 glass rounded-lg transition-all duration-200 hover:neon-glow">
                        {result.thumbnail && (
                          <div className="flex-shrink-0 mr-4">
                            <img
                              src={result.thumbnail}
                              alt={result.title || 'Result'}
                              className="w-24 h-24 object-cover rounded border border-white/10"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="text-base font-semibold text-white transition-colors line-clamp-2 flex-1">
                              {result.title || 'No title'}
                            </h3>
                            <span className="flex-shrink-0 text-xs text-gray-300 font-medium bg-white/10 px-2 py-1 rounded">
                              #{result.position}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 mt-1 truncate">
                            {result.displayed_link || result.link || 'No link'}
                          </p>
                          {result.description && (
                            <p className="text-sm text-gray-200 mt-2 line-clamp-2">
                              {result.description}
                            </p>
                          )}
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          <svg className="w-5 h-5 text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <svg className="w-16 h-16 text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-300 text-base">No results found. Upload an image to search.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <SimpleAlert severity={alertData.severity} message={alertData.message} />
    </div>
  );
}

export default Imagesearchcomponent;
