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
    <>
      <div class="flex flex-col justify-center  ml-[10vw]">
        <div class="flex flex-col gap-6 px-4 py-10  max-w-[80vw]  ">
          <h1 class="text-[#0d141c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-center pb-3 pt-5">
            Choose your plan?
          </h1>
          <div class="grid grid-cols-[repeat(auto-fit,minmax(228px,1fr))] gap-2.5  px-4 py-3 @3xl:grid-cols-4">
           
            <div class="flex flex-1   flex-col gap-4 rounded-xl border border-solid border-[#cedbe8] bg-slate-50 p-10">
              <div class="flex flex-col gap-1">
                <h1 class="text-[#0d141c] text-base font-bold leading-tight">
                  Standard
                </h1>
                <p class="flex items-baseline gap-1 text-[#0d141c]">
                  <span class="text-[#0d141c] text-4xl font-black leading-tight tracking-[-0.033em]">
                    $99
                  </span>
                  <span class="text-[#0d141c] text-base font-bold leading-tight">
                    
                  </span>
                </p>
              </div>
              <button onClick={() => handlePayment(500)}  class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7edf4] text-[#0d141c] text-sm font-bold leading-normal tracking-[0.015em]">
                <span class="truncate">Move to payment page</span>
              </button>
              <div class="flex flex-col gap-2">
                <div class="text-[13px] font-normal leading-normal flex gap-3 text-[#0d141c]">
                  <div
                    class="text-[#0d141c]"
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
                  500 credits 
                </div>
                <div class="text-[13px] font-normal leading-normal flex gap-3 text-[#0d141c]">
                  <div
                    class="text-[#0d141c]"
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
                <div class="text-[13px] font-normal leading-normal flex gap-3 text-[#0d141c]">
                  <div
                    class="text-[#0d141c]"
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
            <div class="flex flex-1 flex-col gap-4 rounded-xl border border-solid border-[#cedbe8] bg-slate-50 p-10">
              <div class="flex flex-col gap-1">
                <h1 class="text-[#0d141c] text-base font-bold leading-tight">
                  Pro
                </h1>
                <p class="flex items-baseline gap-1 text-[#0d141c]">
                  <span class="text-[#0d141c] text-4xl font-black leading-tight tracking-[-0.033em]">
                    $299
                  </span>
                  <span class="text-[#0d141c] text-base font-bold leading-tight">
                    
                  </span>
                </p>
              </div>
              <button onClick={() => handlePayment(2000)} class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7edf4] text-[#0d141c] text-sm font-bold leading-normal tracking-[0.015em]">
                <span class="truncate">Move to payment page</span>
              </button>
              <div class="flex flex-col gap-2">
                <div class="text-[13px] font-normal leading-normal flex gap-3 text-[#0d141c]">
                  <div
                    class="text-[#0d141c]"
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
                  2000 credits 
                </div>
                <div class="text-[13px] font-normal leading-normal flex gap-3 text-[#0d141c]">
                  <div
                    class="text-[#0d141c]"
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
                <div class="text-[13px] font-normal leading-normal flex gap-3 text-[#0d141c]">
                  <div
                    class="text-[#0d141c]"
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
                <div class="text-[13px] font-normal leading-normal flex gap-3 text-[#0d141c]">
                  <div
                    class="text-[#0d141c]"
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
export default Pricing;
