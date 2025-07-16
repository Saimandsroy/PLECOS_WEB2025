import React from "react";
import './Tabs.css'
const tabs = [
  {
    key: 'all',
    value: 'All'
  },
  {
    key: 'in-progress',
    value: 'In Progress'
  },
  {
    key: 'completed',
    value: 'Completed'
  },
]

function Tabs({active, setActive}) {
  return (
    <div className="myt-tabs">
    {tabs.map((tab)=>(

      <button
      key={tab.key}
      onClick={()=>setActive(tab.key)}
        className={`myt-tab ${active===tab.key? "myt-tab-active": ""}`}
      >
        {tab.value}
      </button>
    ))}
    </div>
  );
}

export default Tabs;
