import { IRegister } from "./Interfaces";
import { showInfoToast } from "./Toastyfy";

export const validateForm = (formData:IRegister) => {
    if (!formData.name.trim()) {
      showInfoToast("Name is required");
      return false;
    }
    if (!formData.place.trim()) {
     showInfoToast ("Place is required");
      return false;
    }
    if (!formData.phoneNumber || formData.phoneNumber.toString().length !== 10) {
     showInfoToast ("Enter a valid 10-digit phone number");
      return false;
    }
    if (!formData.email.includes("@")) {
     showInfoToast ("Enter a valid email");
      return false;
    }
    if (formData.password.length < 6) {
     showInfoToast ("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };