import { MdDriveFileRenameOutline, MdEmail, MdLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import RoleSelector from "./RoleSelector";

const RegisterView = ({
  roles,
  activeRole,
  roleLabel,
  showPassword,
  loading,
  name,
  email,
  password,
  rollNumber,
  classNameValue,
  section,
  phone,
  parentName,
  parentPhone,
  onRoleChange,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onRollNumberChange,
  onClassNameChange,
  onSectionChange,
  onPhoneChange,
  onParentNameChange,
  onParentPhoneChange,
  onSubmit,
}) => {
  return (
<section className="min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6">
  
  <div className="w-full max-w-6xl">
    
    {/* Header */}
    <header className="text-center mb-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
        Register Portal (Temporary)
      </h1>
      <p className="text-sm text-gray-600 mt-1">
        Select your role and register
      </p>
    </header>

    {/* Main Layout */}
    <div className="flex flex-col md:flex-row gap-6">
      
      {/* Left - Role Selector */}
      <div className="md:w-1/3">
        <RoleSelector
          roles={roles}
          activeRole={activeRole}
          onSelect={onRoleChange}
        />
      </div>

      {/* Right - Register Form */}
      <div className="md:w-2/3">
        <div className="p-4 sm:p-5 md:p-6 bg-blue-500 text-white rounded-xl shadow-md">
          
          <h2 className="text-base sm:text-lg md:text-xl font-medium mb-4">
            {roleLabel} Register
          </h2>

          <form className="space-y-3 sm:space-y-4" onSubmit={onSubmit}>
            <input type="hidden" name="role" value={activeRole} />

            {/* Name */}
            <div className="flex items-center bg-white rounded-lg px-3">
              <MdDriveFileRenameOutline className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                required
                onChange={(e) => onNameChange(e.target.value)}
                className="w-full p-2.5 sm:p-3 outline-none text-black bg-transparent"
              />
            </div>

            {/* Email */}
            <div className="flex items-center bg-white rounded-lg px-3">
              <MdEmail className="w-5 h-5 text-gray-500" />
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                required
                onChange={(e) => onEmailChange(e.target.value)}
                className="w-full p-2.5 sm:p-3 outline-none text-black bg-transparent"
              />
            </div>

            {/* Password */}
            <div className="flex items-center bg-white rounded-lg px-3">
              <MdLock className="w-5 h-5 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                required
                className="w-full p-2.5 sm:p-3 outline-none text-black bg-transparent"
              />
              <button type="button" onClick={onTogglePassword}>
                {showPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5 text-gray-500" />
                ) : (
                  <AiOutlineEye className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>

            {/* Student Fields */}
            {activeRole === "student" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input placeholder="Roll Number" value={rollNumber} onChange={(e)=>onRollNumberChange(e.target.value)} className="p-3 rounded-lg text-black" />
                <input placeholder="Class" value={classNameValue} onChange={(e)=>onClassNameChange(e.target.value)} className="p-3 rounded-lg text-black" />
                <input placeholder="Section" value={section} onChange={(e)=>onSectionChange(e.target.value)} className="p-3 rounded-lg text-black" />
                <input placeholder="Phone" value={phone} onChange={(e)=>onPhoneChange(e.target.value)} className="p-3 rounded-lg text-black" />
                <input placeholder="Parent Name" value={parentName} onChange={(e)=>onParentNameChange(e.target.value)} className="p-3 rounded-lg text-black" />
                <input placeholder="Parent Phone" value={parentPhone} onChange={(e)=>onParentPhoneChange(e.target.value)} className="p-3 rounded-lg text-black" />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#1E40AF] py-3 text-white transition disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? `Registering ${roleLabel}...` : `Register ${roleLabel}`}
            </button>
          </form>
        </div>
      </div>

    </div>
  </div>
</section>
  );
};

export default RegisterView;
