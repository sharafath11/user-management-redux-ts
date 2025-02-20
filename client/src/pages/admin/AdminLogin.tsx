import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    alert("Login Successful!"); // Replace with real authentication logic
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Admin Login
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter admin email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={admin.password}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter password"
          />
        </div>

        {/* Login Button */}
        <motion.button
          onClick={handleLogin}
          className="w-full py-2 rounded-lg font-semibold text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 transition-all shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  );
}
