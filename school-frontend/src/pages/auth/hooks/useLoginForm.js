import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { getRedirectPath } from "../auth.constants";

const useLoginForm = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!user) return;
    navigate(getRedirectPath(user.role), { replace: true });
  }, [navigate, user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      });

      login(res.data.user, res.data.token);
      navigate(getRedirectPath(res.data.user.role), { replace: true });
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || "Try again");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    showPassword,
    loading,
    email,
    password,
    errorMsg,
    setShowPassword,
    setEmail,
    setPassword,
    handleLogin,
  };
};

export default useLoginForm;
