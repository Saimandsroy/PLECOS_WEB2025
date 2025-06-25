import ContactInfo from "@/components/ContactInfo";
import logo from "@/public/logos/plecos.avif";
import Image from "next/image";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-white flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-md overflow-hidden max-w-6xl w-full flex flex-col md:flex-row">
        <div className="w-full lg:w-1/2 p-8 bg-[#f4faff] hidden md:flex flex-col justify-center relative">
          <Image
            src={logo}
            alt="logo"
            className="opacity-20 absolute w-full h-full object-cover" 
            priority
          />
          <ContactInfo />
        </div>

        <div className="w-full lg:w-1/2 bg-[#d6f5f7] flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center mb-5">
              <div className="flex items-center w-full justify-end gap-2">
                <h1 className="text-2xl font-bold text-black mr-2">PLECOS</h1>
                <Image
                  src={logo}
                  alt="Logo"
                  width={45}
                  height={45}
                  className="drop-shadow-lg/60 rounded" 
                  priority
                />
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
