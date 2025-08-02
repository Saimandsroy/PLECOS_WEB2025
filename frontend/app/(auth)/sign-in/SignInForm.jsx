"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validations/auth.validation";
import api from "@/api/axios";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import "./sign-in.css";

export default function LoginForm() {
    const router = useRouter();
    const [showPwd, setShowPwd] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            const res = await api.post("/auth/login", data, { withCredentials: true });
            localStorage.setItem("token", res.data.data.token);
            router.replace("/");
        } catch (err) {
            const details = err?.response?.data?.details;
            if (details && typeof details === "object") {
                Object.entries(details).forEach(([field, msgs]) => {
                    setError(field, {
                        type: "server",
                        message: Array.isArray(msgs) ? msgs.join(" ") : msgs,
                    });
                });
                return;
            }
            console.error(err);
        }
    };

    return (
        <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="signin-field">
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    type="email"
                    className="signin-input"
                    placeholder="Enter your email"
                    {...register("email")}
                />
                {errors.email && (
                    <span className="signin-error">{errors.email.message}</span>
                )}
            </div>
            <div className="signin-field">
                <label htmlFor="password">Password</label>
                <div className="signin-password-wrapper">
                    <input
                        id="password"
                        type={showPwd ? "text" : "password"}
                        className="signin-input"
                        placeholder="Enter your password"
                        {...register("password")}
                    />
                    <button
                        type="button"
                        className="signin-show-btn"
                        onClick={() => setShowPwd((s) => !s)}
                        tabIndex={-1}
                        aria-label={showPwd ? "Hide password" : "Show password"}
                    >
                        {showPwd ? (
                            <EyeClosedIcon width={20} height={20} />
                        ) : (
                            <EyeOpenIcon width={20} height={20} />
                        )}
                    </button>
                </div>
                {errors.password && (
                    <span className="signin-error">{errors.password.message}</span>
                )}
            </div>

            {/* role */}
            <div className="signin-field">
                <label htmlFor="role">Role</label>
                <select id="role" className="signin-input" defaultValue="learner" {...register("role")}>
                    <option value="learner">Learner</option>
                    <option value="educator">Educator</option>
                </select>
                {errors.role && (
                    <span className="signin-error">{errors.role.message}</span>
                )}
            </div>

            <button type="submit" className="signin-btn" disabled={isSubmitting}>
                {isSubmitting ? "Signing In…" : "Sign In"}
            </button>
        </form>
    );
}
