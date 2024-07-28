import { EducationList } from "@types";

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

export type PasswordValidationType = {
  length: boolean,
  upperCase: boolean,
  lowerCase: boolean,
  number: boolean,
  specialChar: boolean
}

export const checkAllFields = (validation: PasswordValidationType): boolean => {
  return Object.values(validation).every(item => item);
}

export const validatePassword = (password: string): PasswordValidationType => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const validation = {
      length: password.length >= minLength,
      upperCase: hasUpperCase,
      lowerCase: hasLowerCase,
      number: hasNumber,
      specialChar: hasSpecialChar
    }
    return validation;
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