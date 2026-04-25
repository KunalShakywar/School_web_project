import { MdEmail, MdLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
  return (
    <section className="flex items-center justify-center px-3 sm:px-4 md:px-6 ">
      
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
        
        {/* Header */}
        <header className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            Login Portal
          </h1>
        </header>

        {/* Login Card */}
        <div className="mt-5 sm:mt-6 p-4 sm:p-5 md:p-6 bg-blue-500 border text-white rounded-xl shadow-md">
          
          <h2 className="text-base sm:text-lg md:text-xl font-medium mb-2">
            Login to your account
          </h2>
          <p className="mb-4 text-xs sm:text-sm text-blue-100">
            We&apos;ll detect your role automatically after you sign in.
          </p>

          <form className="space-y-3 sm:space-y-4" onSubmit={onSubmit}>
            {/* Email */}
            <div className="flex items-center bg-white rounded-lg px-3">
              <MdEmail className="text-gray-500 w-5 h-5" />
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
                className="w-full p-2.5 sm:p-3 outline-none text-black bg-transparent text-sm sm:text-base"
              />

              <button
                type="button"
                onClick={onTogglePassword}
                className="text-gray-500"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5" />
                ) : (
                  <AiOutlineEye className="w-5 h-5" />
                )}
              </button>
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
