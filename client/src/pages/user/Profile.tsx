import { useState } from "react";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IUser } from "../../utils/Interfaces";
import { postRequest } from "../../utils/services";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/authSlice";
import { editingValidateForm } from "../../utils/Validate";

export default function Profile() {
  const dispatch=useDispatch()
  const user = useSelector((state): IUser => state.auth);
 
  const [formData, setFormData] = useState({
    name: user.name || "",
    phoneNumber: user.phoneNumber || "",
    image: user.image, 
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
       
        const file = e.target.files[0]; 
        setFormData(prevFormData => ({
            ...prevFormData,
            image: file
        }));
    }
};

  

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedFormData = new FormData();
      updatedFormData.append("name", formData.name);
      updatedFormData.append("phoneNumber", formData.phoneNumber as string);
      updatedFormData.append("image", formData.image); 
      if (!editingValidateForm(formData)) {
        return
      }
      const res = await postRequest("edit", updatedFormData);
    
      if (res?.ok) {
        console.log(res)
        dispatch(updateUser({ ...formData, image: res.imageUrl })); 
        return 
      } else {
        formData.name = user.name;
        formData.phoneNumber=user.phoneNumber
      } 
     

    } catch (error) {
      console.error(error);
    }
    setIsEditing(false);
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
  {/* Profile Image */}
  <img
     src={`http://localhost:4000/${user.image}`}
    alt="Profile"
    className="w-full h-full object-cover rounded-full border-4 border-gray-300"
  />


  {isEditing && (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-full">
      {formData.image && (
        <img
          src={formData.image}
          alt="Preview"
          className="w-24 h-24 object-cover rounded-full border-2 border-white mb-2"
        />
      )}

      <label
        htmlFor="imageUpload"
        className="cursor-pointer flex items-center justify-center"
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
  )}
</div>


        {/* Name */}
        <div className="mt-2">
          {isEditing ? (
            <input
              type="text"
              className="bg-gray-200 text-center p-2 rounded outline-none text-gray-900 w-full"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <motion.h2 className="text-xl font-semibold">{formData.name}</motion.h2>
          )}
        </div>

        {/* Email (Not Editable) */}
        <p className="text-gray-500 mt-2">{user.email}</p>

        {/* Phone Number */}
        <div className="mt-2">
          {isEditing ? (
            <input
              type="text"
              className="bg-gray-200 text-center p-2 rounded outline-none text-gray-900 w-full"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
            />
          ) : (
            <motion.p className="text-gray-600">
              {formData.phoneNumber || "No phone number added"}
            </motion.p>
          )}
        </div>

        {/* Edit/Save Button */}
        <button
          onClick={isEditing ? handleSaveChanges : handleEditClick}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          {isEditing ? "Save Changes" : <FaEdit />}
        </button>
      </motion.div>
    </div>
  );
}
