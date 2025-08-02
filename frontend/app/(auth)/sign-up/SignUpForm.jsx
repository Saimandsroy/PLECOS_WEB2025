"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/validations/auth.validation";
import api from "@/api/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import "./sign-up.css";

/* ----------------------------- */
export default function SignUpForm() {
    const router = useRouter();
    const [showPwd, setShowPwd] = useState(false);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data) => {
        try {
            const res = await api.post(
                "/auth/register",
                { email: data.email, password: data.password },
                { withCredentials: true }
            );

            localStorage.setItem("token", res.data.data.token);
            router.replace("/");
        } catch (err) {
            const details = err?.response?.data?.details;
            if (details && typeof details === "object") {
                Object.entries(details).forEach(([field, messages]) => {
                    setError(field, {
                        type: "server",
                        message: (Array.isArray(messages) ? messages.join(" ") : messages),
                    });
                });
                return;
            }
            console.error(err);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
            <div className="signup-field">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="signup-input"
                    {...register("email")}
                />
                {errors.email && <span className="signup-error">{errors.email.message}</span>}
            </div>

            {/* password */}
            <div className="signup-field">
                <label htmlFor="password">Password</label>
                <div className="signup-password-wrapper">
                    <input
                        id="password"
                        type={showPwd ? "text" : "password"}
                        placeholder="Enter your password"
                        className="signup-input"
                        {...register("password")}
                    />
                    <button
                        type="button"
                        className="signup-show-btn"
                        onClick={() => setShowPwd((s) => !s)}
                        tabIndex={-1}
                        aria-label={showPwd ? "Hide password" : "Show password"}
                    >
                        {showPwd ? <EyeClosedIcon width={20} height={20} /> : <EyeOpenIcon width={20} height={20} />}
                    </button>
                </div>
                {errors.password && <span className="signup-error">{errors.password.message}</span>}
            </div>

            <button type="submit" className="signup-btn" disabled={isSubmitting}>
                {isSubmitting ? "Signing up…" : "Sign Up"}
            </button>
        </form>
    );
}
