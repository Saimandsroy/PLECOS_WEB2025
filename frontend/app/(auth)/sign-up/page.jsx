"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import "./sign-up.css";

export default function SignUp() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        router.replace("/");
      }
    }
  }, [router]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        email: data.email,
        password: data.password,
        role: data.role,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        router.replace("/");
      } else {
        // handle error or show message
        console.error("No token in response");
      }
    } catch (error) {
      if (error.response) {
        console.error("API Error:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card decorated">
        <img
          src="/logos/plecos.avif"
          alt="Plecos Logo"
          className="signup-logo"
        />
        <h2 className="signup-title">Sign up to Plecos</h2>
        {loading && (
          <div className="signup-spinner-container">
            <div className="signup-spinner"></div>
          </div>
        )}
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)} style={{ opacity: loading ? 0.6 : 1, pointerEvents: loading ? 'none' : 'auto', boxShadow: loading ? 'none' : undefined }}>
          <div className="signup-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="signup-input"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              autoComplete="email"
              style={{ borderColor: errors.email ? '#ff7f3f' : undefined, background: errors.email ? '#fff6f2' : undefined }}
            />
            {errors.email && <span className="signup-error">Email is required</span>}
          </div>
          <div className="signup-field">
            <label htmlFor="password">Password</label>
            <div className="signup-password-wrapper">
              <input
                id="password"
                type={show ? "text" : "password"}
                className="signup-input"
                placeholder="Enter your password"
                {...register("password", { required: true })}
                autoComplete="new-password"
                style={{ borderColor: errors.password ? '#ff7f3f' : undefined, background: errors.password ? '#fff6f2' : undefined }}
              />
              <button
                type="button"
                className="signup-show-btn"
                onClick={() => setShow((prev) => !prev)}
                tabIndex={-1}
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? <EyeClosedIcon width={20} height={20} /> : <EyeOpenIcon width={20} height={20} />}
              </button>
            </div>
            {errors.password && <span className="signup-error">Password is required</span>}
          </div>
          <div className="signup-field">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              className="signup-input"
              {...register("role", { required: true })}
              defaultValue="learner"
              style={{ borderColor: errors.role ? '#ff7f3f' : undefined, background: errors.role ? '#fff6f2' : undefined }}
            >
              <option value="learner">Learner</option>
              <option value="educator">Educator</option>
            </select>
            {errors.role && <span className="signup-error">Role is required</span>}
          </div>
          <button type="submit" className="signup-btn" disabled={loading} style={{ filter: loading ? 'grayscale(0.5)' : undefined }}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <div className="signup-footer">
          <span>Already have an account?</span>
          <a href="/sign-in" className="signup-link">
            Sign in
          </a>
        </div>
        {/* Decorative elements */}
        <div className="signup-decor-top"></div>
        <div className="signup-decor-bottom"></div>
      </div>
    </div>
  );
}
