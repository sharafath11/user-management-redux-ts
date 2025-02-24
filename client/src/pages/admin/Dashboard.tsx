import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getRequest, postRequest } from "../../utils/services";
import { IAdminUser } from "../../utils/Interfaces";
import { useDispatch } from "react-redux";
import { adminLogin, adminLogout } from "../../redux/adminSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [users, setUsers] = useState<IAdminUser[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)
  const dipatch = useDispatch();
  const navigate=useNavigate()
  useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated]);
  const handleLogout = async () => {
    const res = await getRequest("admin/logout");
    if (res.ok) {
      localStorage.removeItem("adminToken");
      dipatch(adminLogout());
      setUsers([]);
      setIsAuthenticated(false); 
      navigate("/");
    }
  };
  
  
  async function fetchUser() {
    try {
      const res = await getRequest("admin/get-users");
      if (res?.ok) {
        setUsers(res.user);
        dipatch(adminLogin())
        
      } else {
        navigate("/admin")
        console.error("Failed to fetch users:", res?.msg);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const handleChange = (id: string, field: keyof IAdminUser, value: string) => {
    setUsers(users.map(user => (user._id === id ? { ...user, [field]: value } : user)));
  };

  const handleSave = async (id: string) => {
    const userToUpdate = users.find(user => user._id === id);
    if (!userToUpdate) return;

    try {
      const res = await postRequest("admin/update-user", userToUpdate);
      if (res?.ok) {
        console.log("User updated successfully:", res.msg);
      } else {
        console.error("Failed to update user:", res?.msg);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const toggleEdit = (id: string) => {
    if (editingUserId === id) {
      handleSave(id);
      setEditingUserId(null);
    } else {
      setEditingUserId(id);
    }
  };

  const toggleBlock = async (id: string) => {
    setUsers(users.map(user => (user._id === id ? { ...user, isBlocked: !user.isBlocked } : user)));
    try {
      await postRequest("admin/update-user", { _id: id, isBlocked: !users.find(u => u._id === id)?.isBlocked });
    } catch (error) {
      console.error("Error updating block status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 flex flex-col items-center transition-all">
  <div className="w-full max-w-6xl flex justify-between items-center mb-6">
    <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Admin Dashboard</h2>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
     onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all"
    >
      Logout
    </motion.button>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
    {users?.map((user) => (
      <motion.div
        key={user._id}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center transition-all"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={`http://localhost:4000/${user.image}`}
          alt="User Avatar"
          className="w-24 h-24 rounded-full shadow-md mb-4"
        />

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{user.place}</p>

        {["name", "place", "phoneNumber"].map((field) => (
          <div key={field} className="w-full mt-3">
            <label className="block text-gray-700 dark:text-gray-300 font-medium capitalize">{field}</label>
            <input
              type="text"
              value={user[field as keyof IAdminUser]}
              onChange={(e) => handleChange(user._id, field as keyof IAdminUser, e.target.value)}
              className={`mt-1 w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white ${
                editingUserId === user._id ? "" : "cursor-not-allowed bg-gray-300 dark:bg-gray-600"
              }`}
              disabled={editingUserId !== user._id}
            />
          </div>
        ))}

        <div className="w-full flex flex-col gap-2 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleEdit(user._id)}
            className={`w-full py-2 rounded-lg font-semibold transition-all ${
              editingUserId === user._id ? "bg-green-500 text-white hover:bg-green-600" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {editingUserId === user._id ? "Save" : "Edit"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleBlock(user._id)}
            className={`w-full py-2 rounded-lg font-semibold transition-all ${
              user.isBlocked
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {user.isBlocked ? "Unblock User" : "Block User"}
          </motion.button>
        </div>
      </motion.div>
    ))}
  </div>
</div>

  );
}
