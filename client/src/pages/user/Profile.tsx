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
  const [isChanged, setIsChanged] = useState(false); // Track changes

  // Handle profile image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setProfileImage(imageUrl);
      setIsChanged(true); // Show save button
    }
  };

  // Handle name edit
  const handleEditClick = () => {
    setIsEditing(true);
    setIsChanged(true); // Show save button
  };

  // Handle save changes
  const handleSaveChanges = () => {
    setIsEditing(false);
    setIsChanged(false); // Hide save button after saving
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-gray-800/80 backdrop-blur-lg shadow-lg p-8 rounded-lg w-96 border border-gray-700 text-center"
      >
        {/* Profile Image with Edit Option */}
        <div className="relative group w-32 h-32 mx-auto mb-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-gray-700"
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

        {/* Name with Edit Button */}
        <div className="flex justify-center items-center space-x-2">
          {isEditing ? (
            <input
              type="text"
              className="bg-gray-700 text-center p-2 rounded outline-none text-white"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setIsChanged(true); // Show save button
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
            className="p-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            <FaEdit />
          </button>
        </div>

        <p className="text-gray-400 mt-2">{email}</p>

        {/* Save Changes Button - Visible only when changes are made */}
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
