"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SignUpForm from "./SignUpForm";
import "./sign-up.css";

export default function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) router.replace("/");
  }, [router]);

  return (
    <div className="signup-container">
      <div className="signup-card decorated">
        <img src="/logos/plecos.avif" alt="Plecos Logo" className="signup-logo" />
        <h2 className="signup-title">Sign up to Plecos</h2>

        <SignUpForm />

        <div className="signup-footer">
          <span>Already have an account?</span>
          <a href="/sign-in" className="signup-link">Sign in</a>
        </div>

        <div className="signup-decor-top"></div>
        <div className="signup-decor-bottom"></div>
      </div>
    </div>
  );
}
