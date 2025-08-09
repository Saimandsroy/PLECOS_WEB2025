"use client"
import React from "react";
import MySecActions from "./components/MySecActions";
import History from "./components/History";
import { signOut } from "next-auth/react";

const MySecPage = () => {
  const SignOut = async () => {
    await signOut();
  }
  return (
  <div style={{ padding: "2rem 0" }}>
    <h2 style={{ fontWeight: 600, fontSize: 24, marginBottom: 16 }}>Your Space</h2>
    <MySecActions />
    <History />
    <button onClick={SignOut}>SignOut</button>
  </div>
);
}

export default MySecPage;
