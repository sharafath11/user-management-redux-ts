import {motion} from "framer-motion"
export default function Register() {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <motion.div 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
          <input type="text" placeholder="Name" className="w-full p-2 mb-3 bg-gray-700 rounded" />
          <input type="text" placeholder="Place" className="w-full p-2 mb-3 bg-gray-700 rounded" />
          <input type="number" placeholder="Phone Number" className="w-full p-2 mb-3 bg-gray-700 rounded" />
          <input type="email" placeholder="Email" className="w-full p-2 mb-3 bg-gray-700 rounded" />
          <input type="password" placeholder="Password" className="w-full p-2 mb-3 bg-gray-700 rounded" />
          <button className="w-full bg-green-500 hover:bg-green-700 p-2 rounded">Register</button>
        </motion.div>
      </div>
    );
  }