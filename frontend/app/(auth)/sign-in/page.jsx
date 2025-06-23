'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    alert('Login attempt: ' + JSON.stringify(formData)+ " login logic have to change for backend integration");
    // login logic have to change for backend integration
  };
  const [show, setShow] = useState(false)


  return (
    <div className="min-h-screen bg-gradient-to-l from-slate-300 to-slate-900 flex items-center justify-center p-4">
  
      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full min-h-[600px] flex flex-col lg:flex-row">
        
        
        <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-6 lg:p-12 flex flex-col justify-center relative min-h-[300px] lg:min-h-auto">
          
          <div className="absolute inset-0 flex items-center justify-center opacity-15">
            <img src="/logos/plecos.avif" alt="plecos-logo" className='w-100 h-auto' />
          </div>

          <div className="relative z-10 space-y-4 lg:space-y-8">
            
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 font-medium text-sm lg:text-base">Phone</p>
                <a href="tel:+1234567890" className="text-gray-800 font-semibold text-sm lg:text-base hover:underline">
                  +123-456-7890
                </a>
              </div>
            </div>

            
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 font-medium text-sm lg:text-base">E-Mail</p>
                <a href="mailto:plecos@gmail.com" className="text-gray-800 font-semibold text-sm lg:text-base hover:underline">
                  plecos@gmail.com
                </a>
              </div>
            </div>

            
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 font-medium text-sm lg:text-base">Website</p>
                <a href="https://www.plecos.org" target="_blank" rel="noopener noreferrer" className="text-gray-800 font-semibold text-sm lg:text-base hover:underline">
                  www.plecos.org
                </a>
              </div>
            </div>

            
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 font-medium text-sm lg:text-base">Address</p>
                <p className="text-gray-800 font-semibold text-sm lg:text-base">Koni, Bilaspur 495009</p>
              </div>
            </div>
          </div>
        </div>


        
        <div className="flex-1 bg-gradient-to-br from-cyan-100 to-cyan-200 p-6 lg:p-12 flex flex-col justify-center relative min-h-[400px] lg:min-h-auto">
          
          
          <div className="absolute top-4 right-4 lg:top-8 lg:right-8">
            <div className="flex items-center space-x-2">
              <span className="text-lg lg:text-2xl font-bold text-gray-800">PLECOS</span>
              <div className="w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center">
                <img src="/logos/plecos.avif" alt="plecos logo" className='drop-shadow-lg/60 rounded'/>
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto w-full mt-8 ">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6 lg:mb-8 text-center">
              LOGIN TO YOUR ACCOUNT
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-1">
             
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm lg:text-base">
                  Username :
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 lg:px-6 lg:py-4 bg-gray-800 text-white rounded-full placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-400 transition-all text-sm lg:text-base"
                  required
                />
              </div>

              
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm lg:text-base">
                  Email Address :
                </label>
                <input
                  type="email"
                  name="email"

                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 lg:px-6 lg:py-4 bg-gray-800 text-white rounded-full placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-400 transition-all text-sm lg:text-base"
                  required
                />
              </div>

              
              <div className='relative'>
                <label className="block text-gray-700 font-medium mb-2 text-sm lg:text-base">
                  Password :
                </label>
                <input
                  type={show ? 'text' : 'password'}

                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 lg:px-6 lg:py-4 bg-gray-800 text-white rounded-full placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-400 transition-all text-sm lg:text-base"
                  required
                  
                />
                <button
                  type="button"
                  onClick={() => setShow((prev) => !prev)}
                  className="absolute xl:top-13 top-10 right-4 text-gray-400 hover:text-white focus:outline-none"
                >
                { show ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                
              </div>

              
              <button
                type="submit"
                className="w-full bg-cyan-200 hover:bg-cyan-400 text-gray-800 font-semibold py-3 px-4 lg:py-4 lg:px-6 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 mt-3 lg:mt-5 text-sm lg:text-base shadow-lg hover:shadow-xl active:shadow-none"
              >
                LOGIN
              </button>

              
              <div className="text-center mt-4 lg:mt-6">
                <p className="text-gray-600 text-sm lg:text-base">
                  Don't have an account?{' '}
                  <a 
                    href="sign-up" 
                    className="text-cyan-600 hover:text-cyan-700 font-medium hover:underline transition-colors"
                  >
                    Sign Up now
                  </a>
                  <br />
                  <a href="/" className='text-rose-600 hover:text-rose-700 font-medium hover:underline transition-colors'>SKIP</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}