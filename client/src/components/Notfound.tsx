import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
const navigate=useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">
      {/* Animated 404 Number */}
      <motion.h1
        className="text-9xl font-extrabold text-blue-500 dark:text-blue-400 drop-shadow-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        404
      </motion.h1>
      <motion.h2
        className="text-4xl font-bold mt-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Oops! Page Not Found
      </motion.h2>
      <motion.p
        className="text-lg text-gray-600 dark:text-gray-400 mt-2 text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        The page you're looking for doesn’t exist or has been moved.
      </motion.p>
      <motion.a
       onClick={()=>navigate("/")}
        className="cursor-pointer mt-6 px-6 py-3 text-lg font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition-all duration-300 shadow-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Go Back Home
      </motion.a>
    </div>
  );
}
