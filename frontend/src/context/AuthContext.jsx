import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, setBearerToken } from "../api/client";

const TOKEN_KEY = "exp8_token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function restore() {
      if (!token) {
        setBearerToken("");
        setChecking(false);
        return;
      }

      try {
        setBearerToken(token);
        const response = await api.get("/auth/me");
        setUser(response.data.user);
      } catch (_error) {
        localStorage.removeItem(TOKEN_KEY);
        setBearerToken("");
        setToken("");
        setUser(null);
      } finally {
        setChecking(false);
      }
    }

    restore();
  }, [token]);

  async function login(email, password) {
    const response = await api.post("/auth/login", { email, password });
    const nextToken = response.data.token;

    localStorage.setItem(TOKEN_KEY, nextToken);
    setBearerToken(nextToken);
    setToken(nextToken);
    setUser(response.data.user);
  }

  async function register(payload) {
    const response = await api.post("/auth/register", payload);
    const nextToken = response.data.token;

    localStorage.setItem(TOKEN_KEY, nextToken);
    setBearerToken(nextToken);
    setToken(nextToken);
    setUser(response.data.user);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setBearerToken("");
    setToken("");
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      token,
      role: user?.role || null,
      isAuthenticated: Boolean(token && user),
      checking,
      login,
      register,
      logout,
    }),
    [user, token, checking]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
}
