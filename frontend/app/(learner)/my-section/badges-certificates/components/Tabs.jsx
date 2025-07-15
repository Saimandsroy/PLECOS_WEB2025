import React from "react";
import './Tabs.css'
const tabs = [
  {
    key: 'badges',
    value: 'Badges'
  },
  {
    key: 'certificates',
    value: 'Certificates'
  }
]

function Tabs({active, setActive}) {
  return (
    <div className="bac-tabs">
    {tabs.map((tab)=>(
      <button
      key={tab.key}
      onClick={()=>setActive(tab.key)}
        className={`bac-tab ${active===tab.key? "bac-tab-active": ""}`}
      >
        {tab.value}
      </button>
    ))}
    </div>
  );
}

export default Tabs;
