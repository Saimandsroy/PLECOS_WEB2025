"use client";

import InputField from "@/components/InputField";
import AuthButton from "@/components/AuthButton";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add signup logic (e.g., API call)
    router.push("/");
  };

  return (
    <div className="flex flex-col w-full mt-4">
      <h2 className="text-2xl font-bold text-black mb-3">
        CREATE YOUR PLECOS ACCOUNT
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Full Name:"
          name="fullname"
          type="name"
          value={form.fullname}
          onChange={handleChange}
          placeholder="Enter your full name"
          autoComplete="name"
        />

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
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute md:top-13 top-10 right-4 text-gray-400 hover:text-white focus:outline-none"
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <AuthButton>Signup</AuthButton>
      </form>

      <div className="text-center py-2">
        <h3 className="text-black">or</h3>
      </div>

      <button className="w-full flex items-center justify-center text-black border border-gray-300 py-2 rounded-3xl hover:bg-gray-100 transition">
        <FcGoogle className="mr-2 text-lg" /> Sign up with Google
      </button>

      <p className="mt-2 text-center text-sm text-black">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-teal-600 font-semibold hover:underline"
        >
          Login now
        </Link>
      </p>
    </div>
  );
}
