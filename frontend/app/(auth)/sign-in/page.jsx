"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import "./sign-in.css";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check for auth errors from URL params
  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'CredentialsSignin') {
      setError('Invalid credentials. Please check your email and password.');
    }
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      const callbackUrl = searchParams.get('callbackUrl') || '/';
      router.replace(callbackUrl);
    }
  }, [status, router, searchParams]);

  const onSubmit = async (formData) => {
    setLoading(true);
    setError("");
    console.log("Submitting form:", formData);

    try {
      const result = await signIn('credentials', {
        ...formData,
        redirect: false, // Handle redirect manually
      });
      console.log("Sign in result:", result);
      if (result?.error) {
        setError('Invalid credentials. Please check your email and password.');
      } else if (result?.ok) {
        // Success - redirect will happen via useEffect
        const callbackUrl = searchParams.get('callbackUrl') || '/';
        router.replace(callbackUrl);
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError('An unexpected error occurred. Please try again.');
    }

    setLoading(false);
  };

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div className="signin-container">
        <div className="signin-spinner-container">
          <div className="signin-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="signin-container">
      <div className="signin-card decorated">
        <img
          src="/logos/plecos.avif"
          alt="Plecos Logo"
          className="signin-logo"
        />
        <h2 className="signin-title">Sign in to Plecos</h2>

        {error && (
          <div className="signin-error-banner" style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            textAlign: 'center',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {loading && (
          <div className="signin-spinner-container">
            <div className="signin-spinner"></div>
          </div>
        )}

        <form
          className="signin-form"
          onSubmit={handleSubmit(onSubmit)}
          style={{
            opacity: loading ? 0.6 : 1,
            pointerEvents: loading ? "none" : "auto",
          }}
        >
          <div className="signin-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="signin-input"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              autoComplete="email"
              style={{
                borderColor: errors.email ? "#ff7f3f" : undefined,
                background: errors.email ? "#fff6f2" : undefined,
              }}
            />
            {errors.email && (
              <span className="signin-error">Email is required</span>
            )}
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
                style={{
                  borderColor: errors.password ? "#ff7f3f" : undefined,
                  background: errors.password ? "#fff6f2" : undefined,
                }}
              />
              <button
                type="button"
                className="signin-show-btn"
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
            {errors.password && (
              <span className="signin-error">Password is required</span>
            )}
          </div>

          <div className="signin-field">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              className="signin-input"
              {...register("role", { required: true })}
              defaultValue="learner"
              style={{
                borderColor: errors.role ? "#ff7f3f" : undefined,
                background: errors.role ? "#fff6f2" : undefined,
              }}
            >
              <option value="learner">Learner</option>
              <option value="educator">Educator</option>
            </select>
            {errors.role && (
              <span className="signin-error">Role is required</span>
            )}
          </div>

          <button
            type="submit"
            className="signin-btn"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
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
