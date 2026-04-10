import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function onLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>Experiment 8: JWT + RBAC</h1>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          {user?.role === "admin" && <Link to="/admin">Admin</Link>}
          <button className="btn ghost" onClick={onLogout}>Logout</button>
        </nav>
      </header>
      <main className="content-wrap">
        <Outlet />
      </main>
    </div>
  );
}
