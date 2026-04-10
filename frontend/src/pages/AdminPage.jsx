import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await api.get("/user/admin/users");
        setUsers(response.data.users);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load users");
      }
    }

    loadUsers();
  }, []);

  return (
    <section className="panel">
      <p className="kicker">Admin Only</p>
      <h2>User Management</h2>
      {error && <p className="error-box">{error}</p>}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
