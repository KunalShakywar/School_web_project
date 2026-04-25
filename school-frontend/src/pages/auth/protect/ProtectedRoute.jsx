import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { roleRedirects } from "../auth.constants";

const ProtectedRoute = ({ children, allowedRole, allowedRoles }) => {
  const { role, authLoading, user } = useAuth();

  if (authLoading) return <div className="route-loading">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  const permittedRoles = allowedRoles ?? (allowedRole ? [allowedRole] : []);

  if (permittedRoles.length > 0 && !permittedRoles.includes(role)) {
    return <Navigate to={roleRedirects[role] || "/"} replace />;
  }

  return children ?? <Outlet />;
};

export default ProtectedRoute;
