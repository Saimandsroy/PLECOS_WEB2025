import React from "react";
import "./Tabs.css";
const tabs = [
  { key: "videos", value: "Videos" },
  { key: "shorts", value: "Shorts" },
];

function Tabs({ active, setActive }) {
  return (
    <div className="downloads-tabs">
      {tabs.map((tab) => (
        <button
        key={tab.key}
          onClick={() => setActive(tab.key)}
          className={`downloads-tab ${active === tab.key ? "downloads-tab-active" : ""}`}
        >
          {tab.value}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
