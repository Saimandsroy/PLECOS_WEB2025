"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import "./sign-in.css";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");          
  const [show, setShow] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // Replace with actual sign-in logic (API call)
    console.log("Sign in:", { email, password });
    router.push("/");
  };

  return (
    <div className="signin-container">
      <div className="signin-card decorated">
        <img
          src="/logos/plecos.avif"
          alt="Plecos Logo"
          className="signin-logo"
        />
        <h2 className="signin-title">Sign in to Plecos</h2>
        <form className="signin-form" onSubmit={onSubmit}>
          <div className="signin-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="signin-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="signin-field">
            <label htmlFor="password">Password</label>
            <div className="signin-password-wrapper">
              <input
                id="password"
                type={show ? "text" : "password"}
                className="signin-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="signin-show-btn"
                onClick={() => setShow((prev) => !prev)}
                tabIndex={-1}
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? <EyeClosedIcon width={20} height={20} /> : <EyeOpenIcon width={20} height={20} />}
              </button>
            </div>
          </div>
          <button type="submit" className="signin-btn">
            Sign In
          </button>
        </form>
        <div className="signin-footer">
          <span>Don't have an account?</span>
          <a href="/auth/sign-up" className="signin-link">
            Sign up
          </a>
        </div>
        {/* Decorative elements */}
        <div className="signin-decor-top"></div>
        <div className="signin-decor-bottom"></div>
      </div>
    </div>
  );
}


