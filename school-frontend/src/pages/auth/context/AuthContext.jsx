import { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const apiUrl = import.meta.env.VITE_API_URL;

const getWebSocketUrl = () => {
  const wsEnvUrl = import.meta.env.VITE_WS_URL;
  return wsEnvUrl || null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [liveData, setLiveData] = useState({ attendance: null, progress: null });
  const wsRef = useRef(null);
  const isLoggedIn = Boolean(user && token);

  const saveToken = (t) => {
    setToken(t);
    localStorage.setItem("token", t);
  };
// Note: clearToken is defined separately to ensure that token state and localStorage are always in sync, especially during logout or token expiry scenarios.
  const clearToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
// The login function now accepts both user data and token data, allowing for more flexible authentication flows (e.g., after registration or social login). It also ensures that the user's role is set correctly based on the provided user data.
  const login = (userData, tokenData) => {
    setUser(userData);
    setRole(userData.role); 
    saveToken(tokenData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
// The logout function now ensures that all authentication-related state is cleared, including the user, role, token, and any live data. This provides a clean slate for the next login and helps prevent any potential data leaks or unauthorized access after logout.
  const logout = () => {
    setUser(null);
    setRole(null); 
    clearToken();
    localStorage.removeItem("user");
    setLiveData({ attendance: null, progress: null });
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      Promise.resolve().then(() => {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setRole(parsedUser.role);
        } catch (error) {
          console.error("Stored user parse error:", error);
          localStorage.removeItem("user");
        }
      });
    }

    if (!savedToken || !apiUrl) {
      Promise.resolve().then(() => setAuthLoading(false));
      return;
    }

    axios
      .get(`${apiUrl}/api/auth/me`, {
        headers: { Authorization: `Bearer ${savedToken}` },
        timeout: 5000,
      })
      .then((res) => {
        const userData = res.data.user ?? res.data;
        setUser(userData);
        setRole(userData.role); 
        setToken(savedToken);
        localStorage.setItem("user", JSON.stringify(userData));
      })
      .catch(() => {
        clearToken();
        setUser(null);
        setRole(null); 
        localStorage.removeItem("user");
      })
      .finally(() => setAuthLoading(false));
  }, []);

  useEffect(() => {
    if (!user?._id) return;
    const wsUrl = getWebSocketUrl();
    if (!wsUrl) return;

    let ws;
    try {
      ws = new WebSocket(`${wsUrl}?userId=${user._id}`);
    } catch (error) {
      console.warn("WebSocket setup skipped:", error);
      return undefined;
    }

    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "attendance")
          setLiveData((prev) => ({ ...prev, attendance: data.value }));
        if (data.type === "progress")
          setLiveData((prev) => ({ ...prev, progress: data.value }));
      } catch (err) {
        console.error("WS parse error:", err);
      }
    };

    return () => {
      ws.close();
    };
  }, [user?._id]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        liveData,
        isLoggedIn,
        login,
        logout,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
};
