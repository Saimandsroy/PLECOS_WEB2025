"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import "./sign-in.css";
import api from "@/api/axios.js"
export default function SignIn() {
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
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
        role: data.role,
      }, {
        withCredentials: true,
      });

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        router.replace("/");
      } else {
        console.error("No token received from server");
        // Show user-friendly error message
      }
    } catch (error) {
      if (error.response?.status === 401) {
        console.error("Invalid credentials");
        // Show "Invalid email or password" message
      } else if (error.response?.status === 422) {
        console.error("Validation error:", error.response.data);
        // Show validation errors
      } else if (error.response) {
        console.error("API Error:", error.response.data);
      } else {
        console.error("Network Error:", error.message);
      }
    } finally {
      setLoading(false);
    }
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
        {loading && (
          <div className="signin-spinner-container">
            <div className="signin-spinner"></div>
          </div>
        )}
        <form className="signin-form" onSubmit={handleSubmit(onSubmit)} style={{ opacity: loading ? 0.6 : 1, pointerEvents: loading ? 'none' : 'auto', boxShadow: loading ? 'none' : undefined }}>
          <div className="signin-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="signin-input"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              autoComplete="email"
              style={{ borderColor: errors.email ? '#ff7f3f' : undefined, background: errors.email ? '#fff6f2' : undefined }}
            />
            {errors.email && <span className="signin-error">Email is required</span>}
          </div>
          <div className="signin-field">
            <label htmlFor="password">Password</label>
            <div className="signin-password-wrapper">
              <input
                id="password"
                type={show ? "text" : "password"}
                className="signin-input"
                placeholder="Enter your password"
                {...register("password", { required: true })}
                autoComplete="current-password"
                style={{ borderColor: errors.password ? '#ff7f3f' : undefined, background: errors.password ? '#fff6f2' : undefined }}
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
            {errors.password && <span className="signin-error">Password is required</span>}
          </div>
          <div className="signin-field">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              className="signin-input"
              {...register("role", { required: true })}
              defaultValue="learner"
              style={{ borderColor: errors.role ? '#ff7f3f' : undefined, background: errors.role ? '#fff6f2' : undefined }}
            >
              <option value="learner">Learner</option>
              <option value="educator">Educator</option>
            </select>
            {errors.role && <span className="signin-error">Role is required</span>}
          </div>
          <button type="submit" className="signin-btn" disabled={loading} style={{ filter: loading ? 'grayscale(0.5)' : undefined }}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="signin-footer">
          <span>Don't have an account?</span>
          <a href="/sign-up" className="signin-link">
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



