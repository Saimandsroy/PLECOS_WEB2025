"use client";

import { useState, useEffect } from "react";
import InputField from "@/components/InputField";
import AuthButton from "@/components/AuthButton";
import ContactInfo from "@/components/ContactInfo";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import logo from "@/public/logos/plecos.avif";
import { Eye, EyeOff } from "lucide-react";
import { useAuthForm } from "@/hooks/useAuthForm";

export default function SignupPage() {
  
  const { form, handleChange, handleSubmit, success, show, setShow } = useAuthForm({ name: "", email: "", password: "" });
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
            <h2 className="text-2xl font-bold text-black mb-3">SIGNUP TO CREATE ACCOUNT</h2>
            <form onSubmit={handleSubmit((formData) => console.log("Submitted Data:", formData))} className="space-y-4">
              <InputField label="Name:" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Enter your name" />
              <InputField label="Email Address:" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" />
              <div className="relative">
                <InputField label="Password:" name="password" type={show ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="Create Password" />
                <button
                  type="button"
                  onClick={() => setShow((prev) => !prev)}
                  className="absolute top-12 right-4 text-gray-400 hover:text-white focus:outline-none"
                >
                  {show ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <AuthButton>SIGNUP</AuthButton>
              {success && <p className="text-green-500 font-medium">Signup successful</p>}
            </form>
            <div className="text-center py-2">
              <h3 className="text-black">or</h3>
            </div>
            <button className="w-full flex items-center justify-center text-black border border-gray-300 py-2 rounded-3xl hover:bg-gray-100 transition">
              <FcGoogle className="mr-2 text-lg" /> Sign up with Google
            </button>
            <p className="mt-2 text-center text-sm text-black">
              Already have an account? <a href="/sign-in" className="text-teal-600 font-semibold hover:underline">Login now</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
