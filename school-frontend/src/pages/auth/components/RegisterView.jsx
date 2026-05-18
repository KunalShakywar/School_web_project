import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import RoleSelector from "./RoleSelector";
import { useState, useEffect } from "react";
import { getRegisterRoleFields, registerBaseFields } from "./register.fields";

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
  qualification,
  subject,
  className,
  experience,
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
  onQualificationChange,
  onSubjectChange,
  onTeacherClassNameChange,
  onExperienceChange,
  onSubmit,
}) => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showForm ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showForm]);

  const roleFields = getRegisterRoleFields(activeRole);
  const fieldValueMap = {
    name,
    email,
    password,
    rollNumber,
    classNameValue,
    section,
    phone,
    parentName,
    parentPhone,
    qualification,
    subject,
    className,
    experience,
  };
  const fieldHandlerMap = {
    name: onNameChange,
    email: onEmailChange,
    password: onPasswordChange,
    rollNumber: onRollNumberChange,
    classNameValue: onClassNameChange,
    section: onSectionChange,
    phone: onPhoneChange,
    parentName: onParentNameChange,
    parentPhone: onParentPhoneChange,
    qualification: onQualificationChange,
    subject: onSubjectChange,
    className: onTeacherClassNameChange,
    experience: onExperienceChange,
  };

  const renderInputField = (field) => {
    const Icon = field.icon;
    const inputType = field.isPassword
      ? showPassword
        ? "text"
        : "password"
      : field.type || "text";

    return (
      <div
        key={field.key}
        className={`flex items-center rounded-lg bg-white px-3 ${
          field.wrapperClassName || ""
        }`}
      >
        {Icon ? <Icon className="h-5 w-5 text-gray-500" /> : null}
        <input
          type={inputType}
          placeholder={field.placeholder}
          value={fieldValueMap[field.key] ?? ""}
          required={field.required ?? false}
          inputMode={field.inputMode}
          maxLength={field.maxLength}
          onChange={(e) => {
            const nextValue =
              field.maxLength && e.target.value.length > field.maxLength
                ? e.target.value.slice(0, field.maxLength)
                : e.target.value;
            fieldHandlerMap[field.key]?.(nextValue);
          }}
          className={`w-full bg-transparent p-2.5 text-black outline-none sm:p-3 ${
            field.inputClassName || ""
          }`}
        />
        {field.key === "password" ? (
          <button type="button" onClick={onTogglePassword}>
            {showPassword ? (
              <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
            ) : (
              <AiOutlineEye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        ) : null}
      </div>
    );
  };

  return (
    <section className="flex min-h-screen  items-center justify-center px-3  sm:px-4 md:px-6">
      <div className="w-full max-w-6xl">
        <header className="text-center">
          <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">
            Register Portal
          </h1>
          <p className="mb-6 mt-1 text-sm text-gray-600 sm:mb-8">
            Register according to roles into database
          </p>
        </header>

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full">
            <RoleSelector
              roles={roles}
              activeRole={activeRole}
              onSelect={(role) => {
                onRoleChange(role);
                setShowForm(true);
              }}
            />
          </div>

          {showForm ? (
            <div className="fixed inset-0 z-50 overflow-y-hidden  flex items-start justify-center bg-black/40 px-3 py-28 backdrop-blur-sm sm:items-center sm:p-4">
              <div
                className="absolute inset-0"
                onClick={() => setShowForm(false)}
              />

              <div className="relative z-50 w-full max-w-xl max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl bg-blue-500 p-4 text-white shadow-2xl sm:p-5 md:p-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="absolute right-3 top-3 text-xl"
                >
                  <span className="rounded-lg border border-white/20 bg-red-500 px-2 py-0.5 text-red-100 transition hover:bg-red-600">
                    ✕
                  </span>
                </button>

                <h2 className="mb-4 pr-10 text-base font-medium sm:text-lg md:text-xl">
                  {roleLabel} Register
                </h2>
                <form className="space-y-3 sm:space-y-4" onSubmit={onSubmit}>
                  <input type="hidden" name="role" value={activeRole} />
                  {registerBaseFields.map(renderInputField)}

                  {roleFields.fields.length > 0 && (
                    <div
                      className={`grid gap-3 sm:gap-4 ${roleFields.columnsClassName}`}
                    >
                      {roleFields.fields.map(renderInputField)}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-[#1E40AF] py-3 text-white transition disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading
                      ? `Registering ${roleLabel}...`
                      : `Register ${roleLabel}`}
                  </button>
                </form>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
export default RegisterView;
