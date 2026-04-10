import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login, register } = useAuth();

  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        await register({ name, email, password });
      } else {
        await login(email, password);
      }

      navigate(location.state?.from || "/dashboard", { replace: true });
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        setError("Cannot reach API. Check backend status and VITE_API_BASE_URL.");
      } else {
        setError(err.response?.data?.message || "Authentication failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-screen">
      <div className="auth-card">
        <p className="kicker">Secure Access</p>
        <h2>{mode === "login" ? "Login Form" : "Create Account"}</h2>

        <form onSubmit={onSubmit} className="auth-form">
          {mode === "register" && (
            <label>
              Name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                minLength={2}
                placeholder="Your full name"
              />
            </label>
          )}

          <label>
            Email
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
              minLength={6}
              placeholder="******"
            />
          </label>

          <div className="auth-actions">
            <button className="btn primary" disabled={loading}>
              {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
            </button>
            <button
              type="button"
              className="btn ghost"
              onClick={() => setMode((current) => (current === "login" ? "register" : "login"))}
              disabled={loading}
            >
              {mode === "login" ? "Need account?" : "Use login"}
            </button>
          </div>
        </form>

        {error && <div className="error-box">{error}</div>}

        <div className="hint-box">
          Demo users: admin@college.edu / Admin@123 and student@college.edu / Student@123
        </div>
      </div>
    </section>
  );
}
