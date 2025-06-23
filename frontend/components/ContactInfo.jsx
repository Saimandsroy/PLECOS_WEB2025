import { FaPhone, FaRegEnvelope } from "react-icons/fa6";
import { IoIosGlobe } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

const ContactInfo = () => (
  <div className="relative z-10 space-y-4 lg:space-y-6 text-[#0d102d]">
    <div className="flex items-start space-x-3">
      <FaPhone className="text-teal-500 mt-1" />
      <div>
        <p className="font-semibold">Phone</p>
        <p>+123-456-7890</p>
      </div>
    </div>
    <div className="flex items-start space-x-3">
      <FaRegEnvelope className="text-teal-500 mt-1" />
      <div>
        <p className="font-semibold">E-Mail</p>
        <p>plecos@gmail.com</p>
      </div>
    </div>
    <div className="flex items-start space-x-3">
      <IoIosGlobe className="text-teal-500 mt-1" />
      <div>
        <p className="font-semibold">Website</p>
        <p>www.plecos.org</p>
      </div>
    </div>
    <div className="flex items-start space-x-3">
      <FaLocationDot className="text-teal-500 mt-1" />
      <div>
        <p className="font-semibold">Address</p>
        <p>Koni, Bilaspur 495009</p>
      </div>
    </div>
  </div>
);

export default ContactInfo;
