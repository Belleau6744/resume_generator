import { EducationList } from "../types/resumeTypes";

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

export const validatePassword = (password: string): boolean => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

export const validateKey = (enteredKey: string, keyList: string[]): boolean => {
  return keyList.includes(enteredKey)
}

export const educationIDExist = (content: EducationList, id: string): boolean => {
  return Object.keys(content).includes(id);
}

export const checkEmptyInputs = (inputFields: object, errorInputs ) => {
  const error = errorInputs;
  Object.entries(inputFields).forEach(item => {
    if (item[1] === '' || item[1] === null || (Array.isArray(item[1]) && item[1].length === 0)) {
      if(!(item[0] === 'endDate' && inputFields['stillWorking'] === true)) {
        error[item[0]] = true;
      }
    }
  });
  return error;
}