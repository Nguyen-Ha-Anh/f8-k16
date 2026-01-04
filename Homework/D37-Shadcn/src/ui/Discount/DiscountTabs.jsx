import React from "react";

const tabs = [
  { id: "vegan", label: "Vegan" },
  { id: "sushi", label: "Sushi" },
  { id: "fastFood", label: "Pizza & Fast food" },
  { id: "other", label: "Other" },
];

export default function DiscountTabs({activeTab, onChange}) {
  return (
    <div>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            px-10 py-3 rounded-full font-poppins font-normal
            ${
              activeTab === tab.id
                ? "border border-[#FC8A06] text-[#FC8A06]"
                : ""
            }
          `}
        >{tab.label}</button>
      ))}
    </div>
  );
}
