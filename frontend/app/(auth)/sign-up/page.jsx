"use client";

import { FcGoogle } from "react-icons/fc";
import { IoIosGlobe } from "react-icons/io";
import { FaLocationDot, FaRegEnvelope, FaPhone } from "react-icons/fa6";

import Image from "next/image";
import logo from "../public/logo.png";

import { useState, useEffect } from "react"; // Add this at top

function Page() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log("Submitted Data:", form);

    // You can now send `form` to an API or Firebase
    // ✅ Reset form
    setForm({
      name: "",
      email: "",
      password: "",
    });
    //alert("Signup Successful!");
    setSuccess(true); // ✅ Show the success message
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="container bg-gradient-to-r from-slate-900 to-white w-screen md:h-screen md:overflow-hidden  flex items-center justify-center">
      <div className=" md:w-4/5 md:h-4/5 bg-white flex flex-col-reverse md:flex-row md:rounded-2xl shadow-md md:overflow-hidden ">
        <div className="left-section md:w-1/2 text-black relative">
          <Image
            src={logo}
            alt="bg-image"
            className="h-full w-full opacity-20 absolute"
          />
          <div className="p-6 text-[#0d102d] space-y-4 bg-[#f4faff] rounded shadow-md w-full h-full  flex flex-col justify-center ">
            {/* Phone */}
            <div className="flex items-start space-x-3">
              <FaPhone className="text-teal-500 mt-1" />
              <div>
                <p className="font-semibold">Phone</p>
                <a>+123-456-7890</a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-3">
              <FaRegEnvelope className="text-teal-500 mt-1" />
              <div>
                <p className="font-semibold">E-Mail</p>
                <a>hello@example.com</a>
              </div>
            </div>

            {/* Website */}
            <div className="flex items-start space-x-3">
              <IoIosGlobe className="text-teal-500 mt-1" />
              <div>
                <p className="font-semibold">Website</p>
                <a>www.example.com</a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-3">
              <FaLocationDot className="text-teal-500 mt-1" />
              <div>
                <p className="font-semibold">Address</p>
                <p>123 Anywhere St.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="right-section md:w-1/2 text-white bg-blue-300 ">
          <div className=" flex items-center justify-center bg-[#d6f5f7] h-full">
            <div className="w-full mx-8 px-3 ">
              {/* Header */}
              <div className="flex justify-end items-center mb-5 "  id="#">
                <h1 className="text-2xl font-bold text-black cursor-pointer ">
                  PLECOS
                </h1>

                <span className="text-2xl cursor-pointer">
                  <Image src={logo} alt="Logo" width={45} height={45}/>
                </span>
                {/* Replace with icon */}
              </div>

              {/* Login Title */}
              <h2 className="text-2xl font-bold text-black mb-3">
                SIGNUP TO CREATE ACCOUNT
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Username Field */}
                <div className="mb-4">
                  <label className="block mb-1 text-black font-semibold">
                    Name :
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-1.5 rounded-full bg-[#0d102d] text-white shadow-md placeholder:text-gray-300 focus:outline-none placeholder:text-sm"
                  />
                </div>

                {/* Email Field */}
                <div className="mb-3">
                  <label className="block mb-1 text-black font-semibold">
                    Email Address :
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-1.5 rounded-full bg-[#0d102d] text-white shadow-md placeholder:text-gray-300 focus:outline-none placeholder:text-sm"
                  />
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label className="block mb-1 text-black font-semibold">
                    Password :
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Create password"
                    className="w-full px-4 py-1.5 rounded-full bg-[#0d102d] text-white shadow-md placeholder:text-gray-300 focus:outline-none placeholder:text-sm"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-1 rounded-full bg-[#d6f5f7] text-black font-bold shadow-md cursor-pointer hover:bg-[#c2ecef] transition border-2 border-amber-300"
                >
                  SIGNUP
                </button>
                {success && (
                  <p className="text-green-500 font-medium">
                    Signup Successful!
                  </p>
                )}
              </form>

              <div className="text-center p-1">
                <h3 className="text-black">or</h3>
              </div>

              {/* Google Sign up */}
              <div className="mt-1">
                <button className="w-full flex items-center justify-center text-black border border-gray-300 py-1 rounded-3xl hover:bg-gray-100 transition cursor-pointer">
                  <FcGoogle className="mr-2 text-lg cursor-pointer" />

                  <span>Sign up with Google</span>
                </button>
              </div>

              {/* Sign up Link */}
              <p className="mt-1 text-center text-sm text-black">
                Already have an account?{" "}
                <a
                  href="sign-in"
                  className="text-teal-600 font-semibold hover:underline"
                >
                  Login now
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
