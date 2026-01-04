import React, { useState } from "react";
import DiscountTabs from "./DiscountTabs";
import DiscountSection from "./DiscountSection";

export default function Discount() {
  const [activeTab, setActiveTab] = useState("fastFood");
  return (
    <div className="container">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold font-poppins mb-8">
          Up to -40% 🎊 Order.uk exclusive deals
        </h2>
        <span>
          <DiscountTabs activeTab={activeTab} onChange={setActiveTab} />
        </span>
      </div>
      <DiscountSection activeTab={activeTab}/>
    </div>
  );
}
