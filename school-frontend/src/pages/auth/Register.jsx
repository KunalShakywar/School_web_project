import useRegisterForm from "./hooks/useRegisterForm";
import RegisterView from "./components/RegisterView";

const Register = () => {
  const registerForm = useRegisterForm();

  return (
    <div>
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
      qualification={registerForm.qualification}
      subject={registerForm.subject}
      className={registerForm.className}
      experience={registerForm.experience}
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
      onQualificationChange={registerForm.setQualification}
      onSubjectChange={registerForm.setSubject}
      onTeacherClassNameChange={registerForm.setTeacherClassName}
      onExperienceChange={registerForm.setExperience}
      onSubmit={registerForm.handleRegister}
    />
    </div>
  );
};

export default Register;
