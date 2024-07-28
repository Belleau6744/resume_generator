import { useContext } from 'react';
import { SignupContext } from './SignUpContext';

export const useSignupContext = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignupContext must be used within a signup provider");
  }
  return context;
};