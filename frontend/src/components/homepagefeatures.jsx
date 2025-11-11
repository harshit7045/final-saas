import React from "react";

function Homepagefeatures() {
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[80vw] flex-1">
        <div className="flex flex-col gap-10 px-4 py-10 @container">
          <h1 className="text-[#0d141c] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
            Powerful tools for every use case
          </h1>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            <div className="flex flex-col gap-3 pb-3 hover:transform hover:scale-105 transition-transform duration-200">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl shadow-md hover:shadow-lg transition-shadow"
                style={{
                  backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/49a3b53d-38f4-413d-a5ad-eccf54453ffa.png")',
                }}
              ></div>
              <div>
                <p className="text-[#0d141c] text-base font-medium leading-normal">
                  Email OSINT
                </p>
                <p className="text-[#49719c] text-sm font-normal leading-normal">
                  Validate email addresses and check if they are disposable, deliverable, or webmail
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 pb-3 hover:transform hover:scale-105 transition-transform duration-200">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl shadow-md hover:shadow-lg transition-shadow"
                style={{
                  backgroundImage: 'url("https://cdn.usegalileo.ai/stability/3e566205-d1a1-44cc-b1d0-bba1816913bd.png")',
                }}
              ></div>
              <div>
                <p className="text-[#0d141c] text-base font-medium leading-normal">
                  Phone Number OSINT
                </p>
                <p className="text-[#49719c] text-sm font-normal leading-normal">
                  Validate phone numbers and get location, carrier, and line type information
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 pb-3 hover:transform hover:scale-105 transition-transform duration-200">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl shadow-md hover:shadow-lg transition-shadow"
                style={{
                  backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/bfa16242-8d5f-4d32-a9e0-18f1b69ae706.png")',
                }}
              ></div>
              <div>
                <p className="text-[#0d141c] text-base font-medium leading-normal">
                  Social Media OSINT
                </p>
                <p className="text-[#49719c] text-sm font-normal leading-normal">
                  Look up Instagram and Twitter profiles by username to get detailed profile information
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 pb-3 hover:transform hover:scale-105 transition-transform duration-200">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl shadow-md hover:shadow-lg transition-shadow"
                style={{
                  backgroundImage: 'url("https://cdn.usegalileo.ai/stability/bd6e430c-affd-4a78-b3c3-4493fb53bf54.png")',
                }}
              ></div>
              <div>
                <p className="text-[#0d141c] text-base font-medium leading-normal">
                  Reverse Image Search
                </p>
                <p className="text-[#49719c] text-sm font-normal leading-normal">
                  Upload an image to find similar images and discover where it appears online
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepagefeatures;
