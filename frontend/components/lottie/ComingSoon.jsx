"use client";

import React from "react";
import Lottie from "lottie-react";
import ComingSoonAnimation from "@/assets/lottie/coming-soon.json";
function ComingSoon() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          marginTop: "120px",
          width: "300px",
        }}
      >
        <Lottie animationData={ComingSoonAnimation} />
      </div>
    </div>
  );
}

export default ComingSoon;
