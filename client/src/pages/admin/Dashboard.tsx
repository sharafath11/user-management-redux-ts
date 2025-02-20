import { useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      place: "New York",
      number: "9876543210",
      isBlocked: false,
      image: "https://i.pravatar.cc/150?img=1",
      isEditing: false, // Track edit mode
    },
    {
      id: 2,
      name: "Alice Smith",
      place: "Los Angeles",
      number: "9876543222",
      isBlocked: false,
      image: "https://i.pravatar.cc/150?img=2",
      isEditing: false,
    },
    {
      id: 3,
      name: "Michael Brown",
      place: "Chicago",
      number: "9876543333",
      isBlocked: false,
      image: "https://i.pravatar.cc/150?img=3",
      isEditing: false,
    },
  ]);

  // Handle Input Change
  const handleChange = (id: number, field: string, value: string) => {
    setUsers(users.map(user => (user.id === id ? { ...user, [field]: value } : user)));
  };

  // Toggle Block/Unblock
  const toggleBlock = (id: number) => {
    setUsers(users.map(user => (user.id === id ? { ...user, isBlocked: !user.isBlocked } : user)));
  };

  // Toggle Edit Mode
  const toggleEdit = (id: number) => {
    setUsers(users.map(user => (user.id === id ? { ...user, isEditing: !user.isEditing } : user)));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 flex flex-col items-center transition-all">
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {users.map(user => (
          <motion.div
            key={user.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center transition-all"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* User Image - Only Displayed, Not Editable */}
            <img
              src={user.image || "https://via.placeholder.com/150"}
              alt="User Avatar"
              className="w-24 h-24 rounded-full shadow-md mb-4"
            />

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{user.place}</p>

            {/* Editable Inputs (Only when in edit mode) */}
            <div className="w-full mt-3">
              <label className="block text-gray-700 dark:text-gray-300 font-medium">Name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => handleChange(user.id, "name", e.target.value)}
                className={`mt-1 w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white ${
                  user.isEditing ? "" : "cursor-not-allowed bg-gray-300 dark:bg-gray-600"
                }`}
                disabled={!user.isEditing}
              />
            </div>

            <div className="w-full mt-3">
              <label className="block text-gray-700 dark:text-gray-300 font-medium">Place</label>
              <input
                type="text"
                value={user.place}
                onChange={(e) => handleChange(user.id, "place", e.target.value)}
                className={`mt-1 w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white ${
                  user.isEditing ? "" : "cursor-not-allowed bg-gray-300 dark:bg-gray-600"
                }`}
                disabled={!user.isEditing}
              />
            </div>

            <div className="w-full mt-3">
              <label className="block text-gray-700 dark:text-gray-300 font-medium">Number</label>
              <input
                type="text"
                value={user.number}
                onChange={(e) => handleChange(user.id, "number", e.target.value)}
                className={`mt-1 w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white ${
                  user.isEditing ? "" : "cursor-not-allowed bg-gray-300 dark:bg-gray-600"
                }`}
                disabled={!user.isEditing}
              />
            </div>

            {/* Buttons */}
            <div className="w-full flex flex-col gap-2 mt-4">
              {/* Edit/Save Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleEdit(user.id)}
                className="w-full py-2 rounded-lg font-semibold transition-all bg-blue-500 text-white hover:bg-blue-600"
              >
                {user.isEditing ? "Save" : "Edit"}
              </motion.button>

              {/* Block/Unblock Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleBlock(user.id)}
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
