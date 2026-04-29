import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TbPasswordMobilePhone } from "react-icons/tb";
const ForgotView = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (!email.trim()) {
        throw new Error("Please enter your email address.");
      }

      await axios.post(`${apiUrl}/api/otp/send-otp`, {
        email: email.trim().toLowerCase(),
      });

      setSuccess("OTP sent successfully. Please check your email or server console.");
      setTimeout(
        () =>
          navigate("/verify-otp", {
            state: { email: email.trim().toLowerCase() },
          }),
        1200
      );
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center  justify-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-blue-500 p-5 text-white shadow-md sm:p-6">
       <span className="flex items-center gap-3 mb-4 bg-slate-50/5 p-2  rounded-3xl text-sm sm:text-base font-medium text-white w-fit">

       <TbPasswordMobilePhone size={28} /> <p className=" text-xl font-bold">Forgot Password</p>
       </span>
        <p className="mb-5 text-sm text-blue-100">
          Enter your email and we&apos;ll send you an OTP to continue the reset flow.
        </p>

        {error && <div className="mb-4 rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-100">{error}</div>}
        {success && <div className="mb-4 rounded-lg bg-green-500/20 px-3 py-2 text-sm text-green-100">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-lg bg-white px-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full bg-transparent p-3 text-sm text-black outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#1E40AF] py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
<span className="text-sm ">

          Remembered your password?{" "}
</span>
        <div className="mt-4 text-center text-sm text-blue-100 flex   items-center justify-center gap-2">
          
          <Link to="/login" className="font-medium text-white bg-slate-50/20 px-2 py-1 rounded-lg hover:bg-slate-50/30 transition">
            Back to login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ForgotView;
