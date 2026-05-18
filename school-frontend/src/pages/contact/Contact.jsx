import React, { useState } from "react";
import { FaInstagram, FaFacebook, FaTelegram } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill required fields");
      return;
    }

    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      message: ""
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 ">
      <h2 className="text-3xl font-bold text-center mb-6">
        Contact Us
      </h2>

      {submitted && (
        <p className="text-green-600 text-center mb-4">
          Message Sent Successfully!
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white/10  backdrop-blur-md  border-stone-100 border  shadow-lg p-6 rounded-xl space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name *"
          value={formData.name}
          onChange={handleChange}
          className="w-full border-stone-10 border p-3 rounded "
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={handleChange}
          className="w-full border-stone-10 border p-3 rounded"
        />

        <textarea
          name="message"
          placeholder="Your Message *"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className="w-full  border-stone-10 border p-3 rounded bg-white"
        ></textarea>
<div className="flex justify-between">

        <button
          type="submit"
          className=" bg-blue-600/70 text-white p-3 rounded font-semibold hover:bg-blue-700"
          >
          Send 
        </button>
        {/* Social Media Icons */}
      <div className="mt-6 flex justify-center gap-6 text-2xl">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="text-pink-600 hover:scale-110 transition"
        >
          <FaInstagram />
        </a>

        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:scale-110 transition"
        >
          <FaFacebook />
        </a>

        <a
          href="https://telegram.org"
          target="_blank"
          rel="noreferrer"
          className="text-sky-500 hover:scale-110 transition"
        >
          <FaTelegram />
        </a>
      </div>
          </div>
      </form>
      
    </div>
  );
};

export default Contact;
