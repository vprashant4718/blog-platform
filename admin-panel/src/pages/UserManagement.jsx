import { useEffect, useState } from "react";
import API from "../utils/api";
import { Shield, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const roles = ["viewer", "author", "editor", "superAdmin"];

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users/allUsers");
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* UPDATE ROLE */
  const handleRoleChange = async (id, role) => {
    try {
      await API.patch(`/users/update/${id}`, { role });
      toast.success("Role updated");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  /* DELETE USER */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await API.delete(`/users/delete/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-xl font-semibold mb-6">User Management</h1>

        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-3  text-start">{u.name}</td>
                <td className="p-3 flex text-start">{u.email}</td>

                {/* ROLE DROPDOWN */}
                <td className="p-3">
                  <select
                    value={u.role}
                    onChange={(e) =>
                      handleRoleChange(u._id, e.target.value)
                    }
                    className="border rounded px-2 py-1 flex items-center"
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </td>

                {/* ACTIONS */}
                <td className="p-3 ">
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="inline-flex items-center gap-1 text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default UserManagement;
