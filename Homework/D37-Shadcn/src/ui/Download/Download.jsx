import React from "react";

export default function Download() {
  return (
    <div className="container py-8 mx-auto">
      <div className="relative bg-[#F2F2F2] rounded-2xl h-[611px] overflow-hidden">

        {/* left */}
        <div className="absolute left-0 bottom-0 z-30">
          <img
            src="/images/laughing.png"
            alt="Friends Laughing"
            className="
              h-[700px]
              object-contain
              translate-y-12
              drop-shadow-[0_40px_60px_rgba(0,0,0,0.35)]
            "
          />
        </div>
        {/* right */}
        <div className="relative z-10 flex h-full items-center left-[575px]">
          <div className="">
            <h1 className="flex font-bold text-[#0B0D26] mb-4">
               <img src="/images/logo.png" className="
               relative
               w-[268px]
               h-[66px]"/>
               <p className="!text-7xl w-[450px]">ing is more</p>
            </h1>

            <div className="flex w-[878px] h-[90px] bg-[#03081F] left-[665px] rounded-full px-6 py-3 mb-6">
              <span className="text-orange-400 font-semibold">
                Personalised
              </span>
              <span className="text-white"> & Instant</span>
            </div>

            <p className="text-gray-600 mb-6">
              Download the Order.uk app for faster ordering
            </p>

            <div className="flex gap-4">
              <img src="/images/appstore.png" className="h-12" />
              <img src="/images/googleplay.png" className="h-12" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
