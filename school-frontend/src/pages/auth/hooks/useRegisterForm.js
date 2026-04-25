import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { getRedirectPath, getRoleLabel, roles } from "../auth.constants";

const useRegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeRole, setActiveRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [classNameValue, setClassName] = useState("10th");
  const [section, setSection] = useState("A");
  const [phone, setPhone] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");

  const roleLabel = useMemo(() => getRoleLabel(activeRole), [activeRole]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const payload = {
        name,
        email,
        password,
        role: activeRole,
        ...(activeRole === "student" && {
          rollNumber,
          className: classNameValue,
          section,
          phone,
          parentName,
          parentPhone,
        }),
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, payload);

      const loginRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      });

      login(loginRes.data.user, loginRes.data.token);
      navigate(getRedirectPath(loginRes.data.user.role || activeRole), { replace: true });
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    roles,
    activeRole,
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
    roleLabel,
    setActiveRole,
    setShowPassword,
    setName,
    setEmail,
    setPassword,
    setRollNumber,
    setClassName,
    setSection,
    setPhone,
    setParentName,
    setParentPhone,
    handleRegister,
  };
};

export default useRegisterForm;
