import useRegisterForm from "./hooks/useRegisterForm";
import RegisterView from "./components/RegisterView";

const Register = () => {
  const registerForm = useRegisterForm();

  return (
    <div className="pt-28">
    <RegisterView
      roles={registerForm.roles}
      activeRole={registerForm.activeRole}
      roleLabel={registerForm.roleLabel}
      showPassword={registerForm.showPassword}
      loading={registerForm.loading}
      name={registerForm.name}
      email={registerForm.email}
      password={registerForm.password}
      rollNumber={registerForm.rollNumber}
      classNameValue={registerForm.classNameValue}
      section={registerForm.section}
      phone={registerForm.phone}
      parentName={registerForm.parentName}
      parentPhone={registerForm.parentPhone}
      onRoleChange={registerForm.setActiveRole}
      onNameChange={registerForm.setName}
      onEmailChange={registerForm.setEmail}
      onPasswordChange={registerForm.setPassword}
      onTogglePassword={() => registerForm.setShowPassword((prev) => !prev)}
      onRollNumberChange={registerForm.setRollNumber}
      onClassNameChange={registerForm.setClassName}
      onSectionChange={registerForm.setSection}
      onPhoneChange={registerForm.setPhone}
      onParentNameChange={registerForm.setParentName}
      onParentPhoneChange={registerForm.setParentPhone}
      onSubmit={registerForm.handleRegister}
    />
    </div>
  );
};

export default Register;
