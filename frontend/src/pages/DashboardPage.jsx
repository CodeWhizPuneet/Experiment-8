import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await api.get("/user/dashboard");
        setMessage(response.data.message);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard");
      }
    }

    loadDashboard();
  }, []);

  return (
    <section className="panel">
      <p className="kicker">Private Route</p>
      <h2>Welcome, {user?.name}</h2>
      {message && <p className="ok-box">{message}</p>}
      {error && <p className="error-box">{error}</p>}
      <p>Role: <strong>{user?.role}</strong></p>
      <p>Email: {user?.email}</p>
    </section>
  );
}
