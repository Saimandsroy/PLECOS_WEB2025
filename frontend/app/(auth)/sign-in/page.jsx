"use client";

import { useState } from "react";
import InputField from "@/components/InputField";
import AuthButton from "@/components/AuthButton";
import ContactInfo from "@/components/ContactInfo";
import { Eye, EyeOff } from "lucide-react";
import { useAuthForm } from "@/hooks/useAuthForm.js";
import logo from "@/public/logos/plecos.avif";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {

const { form, handleChange, handleSubmit, show, setShow,success } = useAuthForm({ username: "", email: "", password: "" });

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-white flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-md overflow-hidden max-w-6xl w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-8 bg-[#f4faff] flex flex-col justify-center relative">
          <Image src={logo} alt="logo" className="opacity-20 absolute w-full h-full object-cover" />
          <ContactInfo />
        </div>

        <div className="w-full lg:w-1/2 bg-[#d6f5f7] flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="flex justify-end items-center mb-5">
              <h1 className="text-2xl font-bold text-black mr-2">PLECOS</h1>
              <Image src={logo} alt="Logo" width={45} height={45}  className="drop-shadow-lg/60 rounded"/>
            </div>
            <h2 className="text-2xl font-bold text-black mb-3">LOGIN TO YOUR ACCOUNT</h2>
            <form onSubmit={handleSubmit((formData) => console.log("Login attempt:", formData))} className="space-y-4">
              <InputField label="Username:" name="username" type="text" value={form.username} onChange={handleChange} placeholder="Enter your username" />
              <InputField label="Email Address:" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" />
              <div className="relative">
                <InputField label="Password:" name="password" type={show ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="Enter your password" />
                <button
                  type="button"
                  onClick={() => setShow((prev) => !prev)}
                  className="absolute top-12 right-4 text-gray-400 hover:text-white focus:outline-none"
                >
                  {show ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <AuthButton>LOGIN</AuthButton>
              {success && <p className="text-green-500 font-medium">Login successful</p>}
              
            </form>
            <div className="text-center py-2">
              <h3 className="text-black">or</h3>
            </div>
            <button className="w-full flex items-center justify-center text-black border border-gray-300 py-2 rounded-3xl hover:bg-gray-100 transition">
              <FcGoogle className="mr-2 text-lg " /> Sign in with Google
            </button>
            
            <p className="mt-2 text-center text-sm text-black">
              Don't have an account? <a href="/sign-up" className="text-teal-600 font-semibold hover:underline">Sign Up now</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
