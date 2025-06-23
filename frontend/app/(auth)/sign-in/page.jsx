"use client";

import InputField from "@/components/InputField";
import AuthButton from "@/components/AuthButton";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  //we will use react-hook-form
  const router = useRouter()
  const [show, setShow] = useState(false)

  return (
    <div className="flex flex-col w-full mt-4">
      <h2 className="text-2xl font-bold text-black mb-3">
        LOGIN TO YOUR ACCOUNT
      </h2>
      <form
        onSubmit={()=>router.push("/")}
        className="space-y-4"
      >
        <InputField
          label="Email Address:"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        <div className="relative">
          <InputField
            label="Password:"
            name="password"
            type={show ? "text" : "password"}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute top-12 right-4 text-gray-400 hover:text-white focus:outline-none"
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
        <FcGoogle className="mr-2 text-lg " /> Sign in with Google
      </button>

      <p className="mt-2 text-center text-sm text-black">
        Don't have an account?{" "}
        <a
          href="/sign-up"
          className="text-teal-600 font-semibold hover:underline"
        >
          Sign Up now
        </a>
      </p>
    </div>
  );
}
