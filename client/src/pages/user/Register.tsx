import {motion} from "framer-motion"
import React, { useState } from "react";
import { IRegister } from "../../utils/Interfaces";
import { postRequest } from "../../utils/services";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../../utils/Validate";
export default function Register() {
  const navigate=useNavigate()
  const [formData, setFormData] = useState<IRegister>({
    name: "",
    place: "",
    phoneNumber: 0,
    email: "",
    password: "",
    image: "",
    loggedIn:false
  })
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!validateForm(formData))return 
    const res = await postRequest("register", formData);
    if (res.ok) {
     navigate("/login")
    }
  }
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <motion.div 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
          <input name="name" type="text" placeholder="Name" onChange={handleChange} className="w-full p-2 mb-3 bg-gray-700 rounded" />
          <input  name="place" type="text" placeholder="Place"  onChange={handleChange}  className="w-full p-2 mb-3 bg-gray-700 rounded" />
          <input name="phoneNumber" type="number" placeholder="Phone Number"  onChange={handleChange}  className="w-full p-2 mb-3 bg-gray-700 rounded" />
          <input name="email" type="email" placeholder="Email"  onChange={handleChange}  className="w-full p-2 mb-3 bg-gray-700 rounded" />
          <input name="password" type="password"  onChange={handleChange}  placeholder="Password" className="w-full p-2 mb-3 bg-gray-700 rounded" />
          <button className="w-full bg-green-500 hover:bg-green-700 p-2 rounded" onClick={handleSubmit}>Register</button>
        </motion.div>
      </div>
    );
  }