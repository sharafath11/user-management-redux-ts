import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Login() {
  

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-900 text-white`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-800 to-gray-900 opacity-60"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-gray-800/80 backdrop-blur-lg shadow-lg p-8 rounded-lg w-96 border border-gray-700"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
        <div className="mb-4">
          <label className="block text-sm mb-2">Email Address</label>
          <input
            type="email"
            className="w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-2">Password</label>
          <input
            type="password"
            className="w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            placeholder="Enter your password"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded shadow-md transition"
        >
          Sign In
        </motion.button>
        <div className="mt-4 text-center text-sm text-gray-400">
          <p>Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Sign up</Link></p>
        </div>
      </motion.div>
    </div>
  );
}
