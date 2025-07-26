"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { FcGoogle } from "react-icons/fc";
import "./sign-up.css";

export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // Replace with actual sign-up logic (API call)
    console.log("Sign up:", { fullName, email, password });
    router.push("/");
  };

  const onGoogleSignUp = () => {
    // Replace with actual Google sign-up logic
    console.log("Sign up with Google");
  };

  return (
    <div className="signup-container">
      <div className="signup-card decorated">
        <img
          src="/logos/plecos.avif"
          alt="Plecos Logo"
          className="signup-logo"
        />
        <h2 className="signup-title">Create your Plecos account</h2>
        <form className="signup-form" onSubmit={onSubmit}>
          <div className="signup-field">
            <label htmlFor="fullname">Full Name</label>
            <input
              id="fullname"
              type="text"
              className="signup-input"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <div className="signup-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="signup-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="signup-field">
            <label htmlFor="password">Password</label>
            <div className="signup-password-wrapper">
              <input
                id="password"
                type={show ? "text" : "password"}
                className="signup-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="signup-show-btn"
                onClick={() => setShow((prev) => !prev)}
                tabIndex={-1}
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? (
                  <EyeClosedIcon width={20} height={20} />
                ) : (
                  <EyeOpenIcon width={20} height={20} />
                )}
              </button>
            </div>
          </div>
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
        <button
          className="signup-google-btn"
          type="button"
          onClick={onGoogleSignUp}
        >
          <FcGoogle className="signup-google-icon" /> Sign up with Google
        </button>
        <div className="signup-footer">
          <span>Already have an account?</span>
          <a href="/auth/sign-in" className="signup-link">
            Login
          </a>
        </div>
        {/* Decorative elements */}
        <div className="signup-decor-top"></div>
        <div className="signup-decor-bottom"></div>
      </div>
    </div>
  );
}
