import axios from "axios";
import { showErrorToast, showInfoToast, showSuccessToast } from "./Toastyfy";

export const baseUrl = "http://localhost:4000/";

export const postRequest = async (url: string, body: object | FormData) => {
  try {
    const isFormData = body instanceof FormData; 

    const res = await axios.post(`${baseUrl}${url}`, body, {
      withCredentials: true, 
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : {}, // ✅ Only set headers for JSON
    });

    if (res.data.ok) {
      showSuccessToast(res.data.msg);
      return res.data;
    }

    showInfoToast(res.data.msg || "Something went wrong!");
    return null;
  } catch (error: any) {
    showErrorToast(error?.response?.data?.msg || "Server error, try again!");
    return null;
  }
};

export const getRequest = async (url: string) => {
  try {
    const res = await axios.get(`${baseUrl}${url}`, {
      withCredentials: true, 
    });

    if (res.data) return res.data;
    showErrorToast(res.data.msg);
  } catch (error) {
    showErrorToast("Server error");
  }
};
