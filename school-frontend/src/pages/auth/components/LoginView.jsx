import { MdEmail, MdLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SiSimplelogin } from "react-icons/si";

const LoginView = ({
  email,
  password,
  showPassword,
  loading,
  errorMsg,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
}) => {
  const [rememberMe, setRememberMe] = useState(false);
  return (
    <section className="flex items-center justify-center px-3 sm:px-4 md:px-6 ">

      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg py-48">


        {/* Login Card */}
        <div className="mt-5 sm:mt-6 p-4 sm:p-5 md:p-6 bg-blue-500 border text-white rounded-xl shadow-md">
          <span className="flex items-center gap-2 mb-4">

            <span className="flex items-center gap-3 bg-slate-50/5 p-2  rounded-3xl text-sm sm:text-base font-medium text-white">
            <SiSimplelogin size={30} className=" bg-transparent " />
             <p className=" text-xl font-bold">Welcome Back</p> 
            </span>
          </span>
          <form className="space-y-3 sm:space-y-4" onSubmit={onSubmit}>
            {/* Email */}
            <div className="flex items-center bg-white rounded-lg px-3">
              <MdEmail className="text-gray-500 w-5 h-5 bg-transparent"/>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                required
                onChange={(e) => onEmailChange(e.target.value)}
                className="w-full p-2.5 sm:p-3 outline-none text-black bg-transparent text-sm sm:text-base"
              />
            </div>

            {/* Password */}
            <div className="flex items-center bg-white hover:bg-green-50 rounded-lg px-3">
              <MdLock className="text-gray-500 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                required
                className="w-full p-2.5 sm:p-3 outline-none text- bg-transparent text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={onTogglePassword}
                className="text-gray-500 focus:outline-none bg-transparent"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5 bg-transparent" />
                ) : (
                  <AiOutlineEye className="w-5 h-5 bg-transparent" />
                )}
              </button>
            </div>
            {/* remeber me */}
            <div className="flex items-center justify-between p-2.5 sm:p-3">
              <span className="flex items-center text-sm  bg-slate-50/20 px-2 py-1 rounded-lg hover:bg-slate-50/30 transition">
                <input type="checkbox" className="w-4 h-4" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                <label className="text-xs  ml-1 ">Remember me</label>
              </span>
              <Link to="/forgot" className="text-xs  bg-slate-50/20 px-2 py-1 rounded-lg hover:bg-slate-50/30 transition">
                Forgot password?
              </Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1e40af]   text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base hover:opacity-90 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Error */}
            {errorMsg && (
              <p className="text-red-300 text-xs sm:text-sm">
                {errorMsg}
              </p>
            )}
          </form>
        </div>

      </div>
    </section>
  );
};

export default LoginView;
