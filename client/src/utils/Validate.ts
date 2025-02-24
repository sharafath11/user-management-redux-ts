import { IEdit, IRegister } from "./Interfaces";
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
export const editingValidateForm = (formData:IEdit) => {
  let isValid = true;

  if (!formData.name.trim()) {
    showInfoToast("Name is required!");
    isValid = false;
  }

  if (!formData.phoneNumber.trim()) {
    showInfoToast("Phone number is required!");
    isValid = false;
  } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
    showInfoToast("Phone number must be 10 digits!");
    isValid = false;
  }

  if (!formData.image) {
    showInfoToast("Image is required!");
    isValid = false;
  }

  return isValid;
};