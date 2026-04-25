import useLoginForm from "./hooks/useLoginForm";
import LoginView from "./components/LoginView";

const Login = () => {
  const loginForm = useLoginForm();

  return (
    <div className="pt-28">
    <LoginView
      email={loginForm.email}
      password={loginForm.password}
      showPassword={loginForm.showPassword}
      loading={loginForm.loading}
      errorMsg={loginForm.errorMsg}
      onEmailChange={loginForm.setEmail}
      onPasswordChange={loginForm.setPassword}
      onTogglePassword={() => loginForm.setShowPassword((prev) => !prev)}
      onSubmit={loginForm.handleLogin}
      />
      </div>
  );
};

export default Login;
