import React from "react";
import "./Tabs.css";
const tabs = [
  { key: "videos", value: "Videos" },
  { key: "shorts", value: "Shorts" },
];

function Tabs({ active, setActive }) {
  return (
    <div className="wt-tabs">
      {tabs.map((tab) => (
        <button
        key={tab.key}
          onClick={() => setActive(tab.key)}
          className={`wt-tab ${active === tab.key ? "wt-tab-active" : ""}`}
        >
          {tab.value}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
