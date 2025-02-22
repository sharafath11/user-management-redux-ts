import React, { useState } from "react";
import { Sun, Moon, User, LogIn, Menu, X, LogOut } from "react-feather"; 
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { postRequest } from "../utils/services";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selecting the user from Redux store
  const user = useSelector((state: any) => state.auth); 

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = async () => {
    try {
      const res = await postRequest("logout", {});
      if (res.ok) {
        dispatch(logout());
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">MyApp</Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-110"
            >
              {darkMode ? <Moon className="w-5 h-5 text-yellow-400" /> : <Sun className="w-5 h-5 text-gray-800" />}
            </button>

            {user.loggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}

            <button
              onClick={() => navigate("/profile")}
              className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(prev => !prev)}
            className="md:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md py-3">
          <button
            onClick={toggleDarkMode}
            className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          {!user.loggedIn ? (
            <button
              onClick={() => navigate("/login")}
              className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
            >
              Logout
            </button>
          )}
          <button
            onClick={() => navigate("/profile")}
            className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
          >
            Profile
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
