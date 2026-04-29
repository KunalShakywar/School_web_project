import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { getRedirectPath } from "../../auth.constants";

const VerifyOtpView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const { login } = useAuth();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(location.state?.email ? 2 : 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
      setStep(2);
    }
  }, [location.state?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();

      if (step === 1) {
        if (!normalizedEmail) throw new Error("Email is required.");
        await axios.post(`${apiUrl}/api/otp/send-otp`, {
          email: normalizedEmail,
        });
        setSuccess(
          "OTP sent successfully. Check your email or server console.",
        );
        setStep(2);
        return;
      }

      if (step === 2) {
        if (!normalizedEmail) throw new Error("Email is required.");
        if (otp.length !== 6) throw new Error("OTP should be 6 digits.");

        const res = await axios.post(`${apiUrl}/api/otp/verify-otp`, {
          email: normalizedEmail,
          otp,
        });

        if (!res.data?.success) {
          throw new Error(res.data?.message || "Invalid OTP");
        }

        setSuccess("OTP verified. Now set your new password.");
        setStep(3);
        return;
      }

      if (step === 3) {
        if (!normalizedEmail) throw new Error("Email is required.");
        if (newPassword.length < 12)
          throw new Error("Password must be at least 12 characters long.");
        if (newPassword !== confirmPassword)
          throw new Error("Passwords do not match.");

        const res = await axios.post(`${apiUrl}/api/otp/reset-password`, {
          email: normalizedEmail,
          newPassword,
        });

        if (!res.data?.success) {
          throw new Error(res.data?.message || "Password reset failed");
        }

        const loginRes = await axios.post(`${apiUrl}/api/auth/login`, {
          email: normalizedEmail,
          password: newPassword,
        });

        login(loginRes.data.user, loginRes.data.token);
        setSuccess("Password updated successfully. Opening your profile...");
        setTimeout(
          () =>
            navigate(getRedirectPath(loginRes.data.user.role), {
              replace: true,
            }),
          1200,
        );
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Password reset failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-blue-500 p-5 text-white shadow-md sm:p-6">
        <h2 className="mb-2 text-2xl font-bold">Verify OTP</h2>
        <p className="mb-5 text-sm text-blue-100">
          {step === 1 && "Enter your email to receive an OTP."}
          {step === 2 && (
            <>
              Enter the 6-digit OTP sent to{" "}
              <span className="font-medium text-white">
                {email || "your email"}
              </span>
              .
            </>
          )}
          {step === 3 && "Set your new password on this same page."}
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-100">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-green-500/20 px-3 py-2 text-sm text-green-100">
            {success}
          </div>
        )}

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

          {step >= 2 && (
            <div className="rounded-lg bg-white px-3">
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="Enter 6-digit OTP"
                required
                className="w-full bg-transparent p-3 text-center tracking-[0.5em] text-sm font-semibold text-black outline-none"
              />
            </div>
          )}

          {step === 3 && (
            <>
              <div className="rounded-lg bg-white px-3">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Create new password"
                  required
                  className="w-full bg-transparent p-3 text-sm text-black outline-none"
                />
              </div>
              <div className="rounded-lg bg-white px-3">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  className="w-full bg-transparent p-3 text-sm text-black outline-none"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#1E40AF] py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? "Please wait..."
              : step === 1
                ? "Send OTP"
                : step === 2
                  ? "Verify OTP"
                  : "Update Password"}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm text-blue-100">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="font-medium text-white bg-slate-50/20 px-2 py-1 rounded-lg hover:bg-slate-50/30 transition"
            >
              Back
            </button>
          ) : (
            <Link to="/forgot" className="font-medium text-white bg-slate-50/20 px-2 py-1 rounded-lg hover:bg-slate-50/30 transition">
              Resend OTP
            </Link>
          )}
          <Link to="/login" className="font-medium text-white bg-slate-50/20 px-2 py-1 rounded-lg hover:bg-slate-50/30 transition">
            Back to login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtpView;
