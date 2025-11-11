import React from "react";
import { useNavigate } from "react-router-dom";
function Homepagepricing() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-[#f8fafc] py-12">
        <div className="flex flex-col gap-8 px-4 max-w-[1200px] w-full">
          <h1 className="text-[#0d141c] text-3xl font-bold leading-tight tracking-[-0.015em] text-center">
            Ready to get started?
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            <div className="flex flex-1 flex-col gap-4 rounded-xl border border-solid border-[#cedbe8] bg-white p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col gap-1">
                <h1 className="text-[#0d141c] text-lg font-bold leading-tight">
                  Basic
                </h1>
                <p className="flex items-baseline gap-1 text-[#0d141c]">
                  <span className="text-[#0d141c] text-4xl font-black leading-tight tracking-[-0.033em]">
                    Free
                  </span>
                  <span className="text-[#0d141c] text-base font-bold leading-tight">
                    /month
                  </span>
                </p>
              </div>
              <button onClick={handleClick} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7edf4] text-[#0d141c] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#cedbe8] transition-colors">
                <span className="truncate">Sign up for free</span>
              </button>
              <div className="flex flex-col gap-2">
                <div className="text-sm font-normal leading-normal flex gap-3 text-[#0d141c]">
                  <div
                    className="text-[#0d141c]"
                    data-icon="Check"
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
                      <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                  100 credits / month
                </div>
                <div className="text-sm font-normal leading-normal flex gap-3 text-[#0d141c]">
                  <div
                    className="text-[#0d141c]"
                    data-icon="Check"
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
                      <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                  Basic data sources
                </div>
                <div className="text-sm font-normal leading-normal flex gap-3 text-[#0d141c]">
                  <div
                    className="text-[#0d141c]"
                    data-icon="Check"
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
                      <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                  Limited search results
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-4 rounded-xl border-2 border-[#0d7cf2] bg-white p-6 hover:shadow-lg transition-shadow relative">
              <div className="absolute top-0 right-0 bg-[#0d7cf2] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                POPULAR
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-[#0d141c] text-lg font-bold leading-tight">
                  Standard
                </h1>
                <p className="flex items-baseline gap-1 text-[#0d141c]">
                  <span className="text-[#0d141c] text-4xl font-black leading-tight tracking-[-0.033em]">
                    $99
                  </span>
                  <span className="text-[#0d141c] text-base font-bold leading-tight">
                    /month
                  </span>
                </p>
              </div>
              <button onClick={handleClick} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#0d7cf2] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0b6cd9] transition-colors">
                <span className="truncate">Get Started</span>
              </button>
              <div className="flex flex-col gap-2">
                <div className="text-sm font-normal leading-normal flex gap-3 text-[#0d141c]">
                  <div
                    className="text-[#0d141c]"
                    data-icon="Check"
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
                      <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                  500 credits / month
                </div>
                <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0d141c]">
                  <div
                    className="text-[#0d141c]"
                    data-icon="Check"
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
                      <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                  Advanced data sources
                </div>
                <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0d141c]">
                  <div
                    className="text-[#0d141c]"
                    data-icon="Check"
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
                      <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                  Unlimited search results
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-4 rounded-xl border border-solid border-[#cedbe8] bg-white p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col gap-1">
                <h1 className="text-[#0d141c] text-lg font-bold leading-tight">
                  Pro
                </h1>
                <p className="flex items-baseline gap-1 text-[#0d141c]">
                  <span className="text-[#0d141c] text-4xl font-black leading-tight tracking-[-0.033em]">
                    $299
                  </span>
                  <span className="text-[#0d141c] text-base font-bold leading-tight">
                    /month
                  </span>
                </p>
              </div>
              <button onClick={handleClick} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7edf4] text-[#0d141c] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#cedbe8] transition-colors">
                <span className="truncate">Get Started</span>
              </button>
              <div className="flex flex-col gap-2">
                <div className="text-sm font-normal leading-normal flex gap-3 text-[#0d141c]">
                  <div
                    className="text-[#0d141c]"
                    data-icon="Check"
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
                      <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                  2000 credits / month
                </div>
                <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0d141c]">
                  <div
                    className="text-[#0d141c]"
                    data-icon="Check"
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
                      <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                  All data sources
                </div>
                <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0d141c]">
                  <div
                    className="text-[#0d141c]"
                    data-icon="Check"
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
                      <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                  All features
                </div>
                <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#0d141c]">
                  <div
                    className="text-[#0d141c]"
                    data-icon="Check"
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
                      <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                  Unlimited search results
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Homepagepricing;
