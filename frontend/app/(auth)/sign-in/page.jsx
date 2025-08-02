"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./SignInForm";
import "./sign-in.css";

export default function SignInPage() {
  const router = useRouter();

  /* redirect if already logged in */
  useEffect(() => {
    if (localStorage.getItem("token")) router.replace("/");
  }, [router]);

  return (
    <div className="signin-container">
      <div className="signin-card decorated">
        <img src="/logos/plecos.avif" alt="Plecos Logo" className="signin-logo" />
        <h2 className="signin-title">Sign in to Plecos</h2>

        <LoginForm />

        <div className="signin-footer">
          <span>Don't have an account?</span>
          <a href="/sign-up" className="signin-link">Sign up</a>
        </div>

        {/* decorative blobs */}
        <div className="signin-decor-top"></div>
        <div className="signin-decor-bottom"></div>
      </div>
    </div>
  );
}
