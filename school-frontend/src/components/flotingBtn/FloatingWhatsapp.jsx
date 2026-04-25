import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsapp = () => {
  const phoneNumber = "918602426826";

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-5 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-green-900/20 transition duration-300 hover:scale-110 md:bottom-6 md:right-6"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default FloatingWhatsapp;
