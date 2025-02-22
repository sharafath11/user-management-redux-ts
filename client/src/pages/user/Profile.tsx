import { useState } from "react";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";

export default function Profile() {
  const [name, setName] = useState("John Doe");
  const [email] = useState("johndoe@example.com");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );
  const [isChanged, setIsChanged] = useState(false);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setProfileImage(imageUrl);
      setIsChanged(true);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setIsChanged(true);
  };
  const handleSaveChanges = () => {
    setIsEditing(false);
    setIsChanged(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white shadow-lg p-8 rounded-lg w-96 border border-gray-300 text-center"
      >
        <div className="relative group w-32 h-32 mx-auto mb-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-gray-300"
          />
          <label
            htmlFor="imageUpload"
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full"
          >
            <FaEdit className="text-white text-xl" />
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="flex justify-center items-center space-x-2">
          {isEditing ? (
            <input
              type="text"
              className="bg-gray-200 text-center p-2 rounded outline-none text-gray-900"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setIsChanged(true);
              }}
            />
          ) : (
            <motion.h2
              initial={{ opacity: 1 }}
              animate={{ opacity: isEditing ? 0 : 1 }}
              className="text-xl font-semibold"
            >
              {name}
            </motion.h2>
          )}
          <button
            onClick={handleEditClick}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            <FaEdit />
          </button>
        </div>

        <p className="text-gray-500 mt-2">{email}</p>

        {isChanged && (
          <button
            onClick={handleSaveChanges}
            className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Save Changes
          </button>
        )}
      </motion.div>
    </div>
  );
}
