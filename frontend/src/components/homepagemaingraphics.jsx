import React from 'react';
import { useNavigate } from 'react-router-dom';

function Homepagemaingraphics() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register');
  };

  return (
    <div className="flex justify-center bg-[#f8fafc]">
      <div className="layout-content-container flex flex-col w-full flex-1">
        <div className="@container">
          <div className="relative w-full px-4 py-12">
            <div className="relative w-full rounded-xl shadow-lg overflow-hidden" style={{ minHeight: '600px' }}>
              <div
                className="absolute inset-0 bg-center bg-no-repeat bg-cover"
                style={{
                  backgroundImage: `url("https://cdn.usegalileo.ai/stability/bd6e430c-affd-4a78-b3c3-4493fb53bf54.png")`,
                  opacity: 0.3
                }}
              ></div>
              <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] px-4 py-12">
                <div className="flex flex-col gap-6 items-center text-center max-w-3xl">
                  <div className="flex flex-col gap-3">
                    <h1 className="text-[#0d141c] text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] @[768px]:text-6xl">
                      One-stop shop for OSINT
                    </h1>
                    <h2 className="text-[#0d141c] text-base font-normal leading-relaxed @[480px]:text-lg @[480px]:font-normal @[480px]:leading-relaxed @[768px]:text-xl">
                      Powerful tools for investigators, researchers, and analysts. OSINT is a powerful tool for understanding the world around us.
                    </h2>
                  </div>
                  <label className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
                    <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                      <div
                        className="text-[#49719c] flex border-none bg-white items-center justify-center pl-4 rounded-l-xl border-r-0 shadow-md"
                        data-icon="MagnifyingGlass"
                        data-size="20px"
                        data-weight="regular"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                        </svg>
                      </div>
                      <input
                        placeholder="Enter your email to get started"
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d141c] focus:outline-0 focus:ring-0 border-none bg-white focus:border-none h-full placeholder:text-[#49719c] px-4 rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal shadow-md"
                        value=""
                      />
                      <div className="flex items-center justify-center rounded-r-xl border-l-0 border-none bg-white pr-2 shadow-md">
                        <button
                          onClick={handleClick}
                          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#0d7cf2] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:bg-[#0b6cd9] transition-colors"
                        >
                          <span className="truncate">Go</span>
                        </button>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepagemaingraphics;
