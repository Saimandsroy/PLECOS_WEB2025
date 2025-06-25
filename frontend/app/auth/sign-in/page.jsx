"use client";
import InputField from "@/components/InputField";
import AuthButton from "@/components/AuthButton";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    router.push("/");
  };

  return (
    <div className="flex flex-col w-full mt-4">
      <h2 className="text-2xl font-bold text-black mb-3">
        LOGIN TO YOUR ACCOUNT
      </h2>
<<<<<<< HEAD:frontend/app/auth/sign-in/page.jsx
      <form
        onSubmit={() => router.push("/")}
        className="space-y-4"
      >
=======

      <form onSubmit={handleSubmit} className="space-y-4">
>>>>>>> 67e6874ad24f95b4b24a03ae42e79a0bb9a5f035:frontend/app/(auth)/sign-in/page.jsx
        <InputField
          label="Email Address:"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          autoComplete="email"
        />

        <div className="relative">
          <InputField
            label="Password:"
            name="password"
            type={show ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute lg:top-13 top-10 right-4 text-gray-400 hover:text-white focus:outline-none"
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <AuthButton>LOGIN</AuthButton>
      </form>

      <div className="text-center py-2">
        <h3 className="text-black">or</h3>
      </div>

      <button className="w-full flex items-center justify-center text-black border border-gray-300 py-2 rounded-3xl hover:bg-gray-100 transition">
        <FcGoogle className="mr-2 text-lg" /> Sign in with Google
      </button>

      <p className="mt-2 text-center text-sm text-black">
        Don't have an account?{" "}
<<<<<<< HEAD:frontend/app/auth/sign-in/page.jsx
        <a
          href="/auth/sign-up"
=======
        <Link
          href="/sign-up"
>>>>>>> 67e6874ad24f95b4b24a03ae42e79a0bb9a5f035:frontend/app/(auth)/sign-in/page.jsx
          className="text-teal-600 font-semibold hover:underline"
        >
          Sign Up now
        </Link>
      </p>
    </div>
  );
}
