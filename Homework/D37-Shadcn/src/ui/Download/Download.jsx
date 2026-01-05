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
        <div className="relative z-10 flex h-full items-center">
          <div className="relative left-[800px]">
            <h1 className="flex font-bold text-[#0B0D26] mb-6">
              <img
                src="/images/logo.png"
                className="
               relative
               w-[268px]
               h-[66px]"
              />
              <p className="!text-7xl w-[450px] font-bold">ing is more</p>
            </h1>

            <div className="relative flex w-[878px] h-[90px] bg-[#03081F] right-[220px] rounded-full px-6 py-3 mb-6">
              <div className="absolute h-[81px] text-6xl right-[40px]">
                <span className="text-orange-400 font-medium underline decoration-2">
                  Personalised
                </span>
                <span className="text-white"> & Instant</span>
              </div>
            </div>

            <p className="relative w-[488px] h-[36px] text-2xl left-[120px]">
              Download the Order.uk app for faster ordering
            </p>

            <div className="flex relative left-[120px] items-center">
              <img
                src="/images/downappstore.webp"
                alt="App Store"
                className="w-auto h-[100px]"
              />
              <img src="/images/downgoogplay.png" alt="Google Play"
              className="relative w-[220px] h-[135px] -left-[25px] object-cover z-99" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
