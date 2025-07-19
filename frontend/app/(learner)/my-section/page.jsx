import React from "react";
import MySecActions from "./components/MySecActions";
import History from "./components/History";

const MySecPage = () => (
  <div style={{ padding: "2rem 0" }}>
    <h2 style={{ fontWeight: 600, fontSize: 24, marginBottom: 16 }}>Your Space</h2>
    <MySecActions />
    <History />
  </div>
);

export default MySecPage;
